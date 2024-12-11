import { PLANS_ITEMS } from '../../constants'
import { PlanSummaryCard } from '../plan-summary-card'

export const PlansSection = () => {
  return (
    <section className="space-y-12 mb-52 dark" id="plans">
      <div className="text-center">
        <h2 className="text-4xl font-semibold tracking-tighter text-foreground">
          Planos
        </h2>
        <p className="font-medium text-muted-foreground">
          Escolha o Plano Perfeito para Você
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-8 gap-6 max-w-3xl px-0 lg:px-8 mx-auto w-full">
        {PLANS_ITEMS.map((plan, index) => (
          <PlanSummaryCard key={index} plan={plan} />
        ))}
      </div>
    </section>
  )
}
