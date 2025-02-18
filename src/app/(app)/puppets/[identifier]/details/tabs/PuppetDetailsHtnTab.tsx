'use client'

import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import StatusDot from '@/ui/components/StatusDot'
import type { StatusLevel } from '@/ui/components/StatusDot'

import type { PuppetDTO } from '../../../logic'

type PuppetDetailsHtnTabProps = {
  puppet: PuppetDTO
}

export default function PuppetDetailsHtnTab(props: PuppetDetailsHtnTabProps) {
  const [state, setState] = useState<any>({})
  const [goals, setGoals] = useState<any>({})
  const [plan, setPlan] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])

  const { readyState: wsState } = useWebSocket(props.puppet.ws_url, {
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
  })

  return (
    <>
      <HtnConnectionSection wsState={wsState} />
      <HtnStateSection state={state} />
      <HtnGoalsSection goals={goals} />
      <HtnPlanSection plan={plan} />
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
      <span>Connection</span>
      <StatusDot status={connectionState} />
    </section>
  )
}
type HtnStateSectionProps = {
  state?: any
}

function HtnStateSection(props: HtnStateSectionProps) {
  return (
    <section className="mb-6">
      <span>State</span>
      <div className="flex gap-3">
        <ul className="flex-1">
          {Object.keys(props.state || {}).map((entry: any, index: number) => {
            return (
              <li
                key={`state-entry-${index}`}
                className="flex items-center gap-1"
              >
                <StatusDot status={'UNDETERMINED'} />
                <span className="flex-1">{entry}</span>
                <span className="flex-1">
                  {JSON.stringify(props.state[entry])}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

type HtnGoalsSectionProps = {
  goals?: any
}

function HtnGoalsSection(props: HtnGoalsSectionProps) {
  return (
    <section className="mb-6">
      <span>Goals</span>
      <div className="flex gap-3">
        <ul className="flex-1">
          {props.goals?.reached?.map((goal: string, index: number) => {
            return (
              <li
                key={`goal-reached-${index}`}
                className="flex items-center gap-1"
              >
                <StatusDot status={'POSITIVE'} />
                <span>{goal}</span>
              </li>
            )
          })}
        </ul>
        <ul className="flex-1">
          {props.goals?.unreached?.map((goal: string, index: number) => {
            return (
              <li
                key={`goal-unreached-${index}`}
                className="flex items-center gap-1"
              >
                <StatusDot status={'NEGATIVE'} />
                <span>{goal}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

type HtnPlanSectionProps = {
  plan?: any[]
}

function HtnPlanSection(props: HtnPlanSectionProps) {
  return (
    <section className="mb-6">
      <span>Plan</span>
      <div className="flex gap-3">
        <ul className="flex-1">
          {props.plan?.map((task: any, index: number) => {
            return (
              <li
                key={`plan-task-${index}`}
                className="flex items-center gap-1"
              >
                <StatusDot status={'UNDETERMINED'} />
                <span className="flex-1">
                  {index + 1}: {task.identifier}
                </span>
                <span className="flex-1">{JSON.stringify(task.effects)}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

type HtnLogsSectionProps = {
  logs?: any[]
}

function HtnLogsSection(props: HtnLogsSectionProps) {
  return (
    <section>
      <span>Logs</span>
      <div className="mt-1 border border-neutral-500 p-3">
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
    </section>
  )
}
