import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroupItem } from '@/components/ui/radio-group'

export const ThemePreview = ({
  value,
  label,
  previewClasses,
}: {
  value: 'light' | 'dark'
  label: string
  previewClasses: string
}) => (
  <FormItem>
    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
      <FormControl>
        <RadioGroupItem value={value} className="sr-only" />
      </FormControl>
      <div
        className={`items-center rounded-md border-2 border-muted p-1 hover:border-accent ${previewClasses}`}
      >
        <div className="space-y-2 rounded-sm p-2 shadow-sm">
          <div className="space-y-2 rounded-md p-2 bg-opacity-75">
            <div className="h-2 w-[80px] rounded-lg bg-current opacity-50" />
            <div className="h-2 w-[100px] rounded-lg bg-current opacity-50" />
          </div>
          <div className="flex items-center space-x-2 rounded-md p-2 bg-opacity-75">
            <div className="h-4 w-4 rounded-full bg-current opacity-50" />
            <div className="h-2 w-[100px] rounded-lg bg-current opacity-50" />
          </div>
          <div className="flex items-center space-x-2 rounded-md p-2 bg-opacity-75">
            <div className="h-4 w-4 rounded-full bg-current opacity-50" />
            <div className="h-2 w-[100px] rounded-lg bg-current opacity-50" />
          </div>
        </div>
      </div>
      <span className="block w-full p-2 text-center font-normal">{label}</span>
    </FormLabel>
  </FormItem>
)
