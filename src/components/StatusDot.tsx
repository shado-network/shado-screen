import cn from '@/utils/cn'

export type StatusLevel = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'UNDETERMINED'

type StatusDotProps = {
  status: StatusLevel
  size?: number
}

export default function StatusDot(props: StatusDotProps) {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <div
        className={cn({
          'h-3 w-3 rounded-full': true,
          'bg-green-500': props.status === 'POSITIVE',
          'bg-orange-500': props.status === 'NEUTRAL',
          'bg-red-500': props.status === 'NEGATIVE',
          'bg-neutral-500': props.status === 'UNDETERMINED',
        })}
      />
    </div>
  )
}
