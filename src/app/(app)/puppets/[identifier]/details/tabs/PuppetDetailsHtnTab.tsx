'use client'

import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import StatusDot from '@/ui/components/StatusDot'
import type { StatusLevel } from '@/ui/components/StatusDot'

import type { PuppetDTO } from '../../../logic'

type PuppetDetailsHtnTabProps = {
  puppet: PuppetDTO | null
}

export default function PuppetDetailsHtnTab(props: PuppetDetailsHtnTabProps) {
  const [state, setState] = useState<any>({})
  const [goals, setGoals] = useState<any>({})
  const [plan, setPlan] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])

  // TODO: Move this up to puppet page level?
  const { readyState: wsState } = useWebSocket(
    props.puppet?.ws_url || 'wss://',
    {
      // onOpen: () => {
      //   console.log('WebSocket connection established.')
      // },
      onMessage: (e) => {
        const message = JSON.parse(e.data.toString())

        switch (message.data.identifier) {
          case 'puppetState':
            setState((prevState: any) => {
              return {
                ...prevState,
                ...message.data.state,
              }
            })
            break
          case 'puppetGoals':
            setGoals(message.data.goals)
            break
          case 'puppetPlan':
            setPlan(message.data.plan)
            break
        }

        setLogs((prevLogs: any) => {
          return [...prevLogs, message]
        })
      },
    },
  )

  return (
    <>
      <HtnConnectionSection wsState={wsState} />
      <HtnGoalsSection goals={goals} />
      <HtnPlanSection plan={plan} />
      <HtnStateSection state={state} />
      <HtnLogsSection logs={logs} />
    </>
  )
}

//

type HtnConnectionSectionProps = {
  wsState: ReadyState
}

function HtnConnectionSection(props: HtnConnectionSectionProps) {
  const connectionState: StatusLevel = (
    {
      [ReadyState.CONNECTING]: 'NEUTRAL',
      [ReadyState.OPEN]: 'POSITIVE',
      [ReadyState.CLOSING]: 'NEUTRAL',
      [ReadyState.CLOSED]: 'NEGATIVE',
      [ReadyState.UNINSTANTIATED]: 'UNDETERMINED',
    } as { [key: string]: StatusLevel }
  )[props.wsState]

  return (
    <section className="mb-6 mt-6 flex items-center gap-1">
      <span className="flex h-8 items-center">Connection</span>
      <StatusDot status={connectionState} />
    </section>
  )
}

type HtnGoalsSectionProps = {
  goals?: any
}

function HtnGoalsSection(props: HtnGoalsSectionProps) {
  return (
    <details
      className="mb-6 border border-primary p-6 shadow-glow drop-shadow"
      open={true}
    >
      <summary className="cursor-pointer uppercase text-primary shadow-glow text-shadow">
        Goals
      </summary>
      <div className="mt-3 flex gap-3">
        <ul>
          {props.goals?.reached?.map(
            (
              goal: { identifier: string; description: string },
              index: number,
            ) => {
              return (
                <li key={`goal-reached-${index}`} className="mb-3 flex gap-1">
                  <StatusDot status={'POSITIVE'} />
                  <div className="flex flex-1 flex-col">
                    <span className="flex h-8 items-center text-white">
                      {goal.identifier}
                    </span>
                    <span className="text-neutral-400">{goal.description}</span>
                  </div>
                </li>
              )
            },
          )}
          {props.goals?.unreached?.map(
            (
              goal: { identifier: string; description: string },
              index: number,
            ) => {
              return (
                <li key={`goal-unreached-${index}`} className="mb-3 flex gap-1">
                  <StatusDot status={'NEGATIVE'} />
                  <div className="flex flex-1 flex-col">
                    <span className="flex h-8 items-center text-white">
                      {goal.identifier}
                    </span>
                    <span className="text-neutral-400">{goal.description}</span>
                  </div>
                </li>
              )
            },
          )}
        </ul>
      </div>
    </details>
  )
}

type HtnPlanSectionProps = {
  plan?: any[]
}

function HtnPlanSection(props: HtnPlanSectionProps) {
  return (
    <details
      className="mb-6 border border-primary p-6 shadow-glow drop-shadow"
      open={true}
    >
      <summary className="cursor-pointer uppercase text-primary shadow-glow text-shadow">
        Plan
      </summary>
      <div className="mt-3 flex gap-3">
        <ul className="flex-1">
          {props.plan?.map((task: any, index: number) => {
            return (
              <li key={`plan-task-${index}`} className="mb-3 flex gap-1">
                <StatusDot status={'UNDETERMINED'} />
                <span className="flex h-8 items-center">
                  {`${index + 1}`.padStart(2, '0')}:
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="flex h-8 items-center text-white">
                    {task.identifier}
                  </span>
                  <span className="text-neutral-400">{task.description}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </details>
  )
}

type HtnStateSectionProps = {
  state?: any
}

function HtnStateSection(props: HtnStateSectionProps) {
  return (
    <details className="mb-6 border border-neutral-400 p-6" open={true}>
      <summary className="cursor-pointer uppercase text-white">State</summary>
      <div className="mt-3 flex gap-3">
        <ul className="flex-1">
          {Object.keys(props.state || {}).map((entry: any, index: number) => {
            return (
              <li
                key={`state-entry-${index}`}
                className="flex items-center gap-1"
              >
                <StatusDot status={'UNDETERMINED'} />
                <span className="flex h-8 flex-1 items-center">{entry}</span>
                <span className="flex h-8 flex-1 items-center">
                  {JSON.stringify(props.state[entry])}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </details>
  )
}

type HtnLogsSectionProps = {
  logs?: any[]
}

function HtnLogsSection(props: HtnLogsSectionProps) {
  return (
    <details className="border border-neutral-400 p-6" open={false}>
      <summary className="cursor-pointer uppercase text-white">Logs</summary>
      <div className="mt-3">
        {props.logs?.slice(-1 * 3).map((log: any, index: number) => {
          return (
            <div key={`log-${index}`}>
              <div>{log.timestamp}</div>
              <div>{log.plugin}</div>
              <pre>{JSON.stringify(log.data, null, 2)}</pre>
            </div>
          )
        })}
      </div>
    </details>
  )
}
