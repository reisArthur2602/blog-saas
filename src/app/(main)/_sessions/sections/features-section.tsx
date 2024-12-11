import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FEATURES_ITEMS } from '../../constants'

export const FeaturesSection = () => {
  return (
    <section className="space-y-12 mb-52 dark" id="features">
      <div className="text-center">
        <h2 className="text-4xl text-secondary-foreground font-semibold tracking-tighter">
          Funcionalidades
        </h2>
        <p className="font-medium text-muted-foreground">
          Recursos que Tornam o Blogora Único
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {FEATURES_ITEMS.map((features) => (
          <Card key={features.title} className="bg-transparent">
            <CardHeader>
              {features.icon}
              <CardTitle className="text-xl font-semibold">
                {features.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground ">
                {features.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
