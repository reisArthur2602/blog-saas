import { PrismaClient, UserRole, PostCategory } from '@prisma/client'
import { addMonths, startOfYear } from 'date-fns'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Função para gerar hash da senha
const hashPassword = async (password: string) => {
    const saltRounds = 8
    return await bcrypt.hash(password, saltRounds)
}

async function main() {
    console.log('Seeding database...')

    // Criar usuários com senhas criptografadas
    const users = await Promise.all(
        Array.from({ length: 10 }, async (_, i) => {
            const password = await hashPassword(`password${i + 1}`)
            return prisma.user.create({
                data: {
                    email: `user${i + 1}@example.com`,
                    name: `User ${i + 1}`,
                    password, // Senha criptografada
                },
            })
        }),
    )
    console.log(
        'Usuários criados:',
        users.map((user) => user.email),
    )

    // Escolher um usuário para ser o dono do blog
    const owner = users[0]

    // Criar um blog
    const blog = await prisma.blog.create({
        data: {
            slug: 'my-awesome-blog',
            name: 'My Awesome Blog',
            description: 'Um blog incrível com postagens variadas.',
            mainColor: '#FF5733',
            secondColor: '#3333FF',
            users: {
                create: {
                    user: { connect: { id: owner.id } },
                    role: UserRole.OWNER,
                },
            },
        },
    })
    console.log(`Blog criado: ${blog.name}`)

    // Adicionar BlogUsers (Editor e Author)
    const editor = users[1]
    const author = users[2]
    const additionalUsers = users.slice(3, 6) // Mais autores adicionais

    const blogUsers = await prisma.blogUser.createMany({
        data: [
            {
                user_id: editor.id,
                blog_slug: blog.slug,
                role: UserRole.EDITOR,
            },
            {
                user_id: author.id,
                blog_slug: blog.slug,
                role: UserRole.AUTHOR,
            },
            ...additionalUsers.map((user) => ({
                user_id: user.id,
                blog_slug: blog.slug,
                role: UserRole.AUTHOR,
            })),
        ],
    })
    console.log(`BlogUsers adicionados: ${blogUsers.count}`)

    // Criar postagens
    const baseDate = startOfYear(new Date())
    const postsData = [
        {
            title: 'Tecnologia Transformadora',
            subtitle: 'Como a tecnologia está mudando nossas vidas.',
            body: 'A tecnologia moderna está em constante evolução...',
            category: PostCategory.TECHNOLOGY,
        },
        {
            title: 'Dicas de Educação',
            subtitle: 'Métodos eficazes para aprender melhor.',
            body: 'Aprender de forma eficiente requer técnicas específicas...',
            category: PostCategory.EDUCATION,
        },
        {
            title: 'Receitas Saudáveis',
            subtitle: 'Dicas culinárias para um estilo de vida saudável.',
            body: 'Coma bem e viva melhor com estas receitas incríveis...',
            category: PostCategory.CULINARY_AND_GASTRONOMY,
        },
        {
            title: 'Viagens pelo Mundo',
            subtitle: 'Lugares incríveis para explorar.',
            body: 'Explore destinos fascinantes ao redor do mundo...',
            category: PostCategory.TRAVEL,
        },
        {
            title: 'Negócios Sustentáveis',
            subtitle: 'Como empreender com foco na sustentabilidade.',
            body: 'A sustentabilidade está se tornando essencial para negócios...',
            category: PostCategory.BUSINESS_AND_ENTREPRENEURSHIP,
        },
    ]

    for (let i = 0; i < postsData.length; i++) {
        const postDate = addMonths(baseDate, i)

        // Criar posts para o Editor
        await prisma.post.create({
            data: {
                ...postsData[i],
                created_at: postDate,
                blog_slug: blog.slug,
                user_id: editor.id,
            },
        })

        // Criar posts para o Author
        await prisma.post.create({
            data: {
                ...postsData[i],
                title: postsData[i].title + ' (Author)',
                created_at: postDate,
                blog_slug: blog.slug,
                user_id: author.id,
            },
        })

        // Criar posts para autores adicionais
        for (const user of additionalUsers) {
            await prisma.post.create({
                data: {
                    ...postsData[i],
                    title: postsData[i].title + ` (User ${user.name})`,
                    created_at: postDate,
                    blog_slug: blog.slug,
                    user_id: user.id,
                },
            })
        }
    }

    console.log('Posts criados com meses diferentes para todos os usuários.')

    console.log('Seeding concluído.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
