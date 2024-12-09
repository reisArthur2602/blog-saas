type Props = {
  params: { blogSlug: string }
}

const Page = async ({ params: { blogSlug } }: Props) => {
  return <div>{blogSlug}</div>
}

export default Page
