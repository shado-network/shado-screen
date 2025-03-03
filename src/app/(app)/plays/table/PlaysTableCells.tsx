'use client'

import type { Key } from 'react'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'

import { Avatar, Button, Chip } from '@heroui/react'
import type { ChipProps } from '@heroui/react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/react'

import {
  RiExchange2Line,
  RiLinkUnlink,
  RiMore2Line,
  RiPencilLine,
} from 'react-icons/ri'

import { getPlayData, getPlayHealth, removePlayConnection } from '../logic'
import type { PlayDTO, RemovePlayConnectionDTO } from '../logic'

type PlayDataCellProps = {
  play: PlayDTO
}

export function PlayDataCell(props: PlayDataCellProps) {
  const queries = {
    playData: useQuery({
      queryKey: ['play', props.play.identifier, 'data'],
      queryFn: () => getPlayData(props.play),
      // enabled: true,
      // placeholderData: keepPreviousData,
    }),
  }

  return (
    <div className="flex gap-3">
      <div>
        <Avatar
          name={queries.playData.data?.data?.play.name || props.play.identifier}
          src={queries.playData.data?.data?.play.image}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-md text-white">
          {queries.playData.data?.data?.play.name || props.play.identifier}
        </span>
        <span className="text-sm text-neutral-500">{props.play.http_url}</span>
        {/* <span>{play.key}</span> */}
      </div>
    </div>
  )
}

type PlayStatusCellProps = {
  play: PlayDTO
}

export function PlayStatusCell(props: PlayStatusCellProps) {
  const queries = {
    playHealth: useQuery({
      queryKey: ['play', props.play.identifier, 'health'],
      queryFn: () => getPlayHealth(props.play),
      // enabled: true,
      // placeholderData: keepPreviousData,
      //
      refetchOnMount: 'always',
      // NOTE: Check every minute.
      refetchInterval: 1 * 60 * 1000,
    }),
  }

  const statusColorMap: {
    [key: string]: ChipProps['color']
  } = {
    online: 'success',
    offline: 'danger',
  }

  // NOTE: Check if ping reply is more recent than 1 minute ago.
  const playStatus =
    queries.playHealth.data?.timestamp >= Date.now() - 1 * 60 * 1000
      ? 'online'
      : 'offline'

  return (
    <Chip
      className="uppercase"
      color={statusColorMap[playStatus || 'offline']}
      size="sm"
      variant="flat"
    >
      {playStatus || 'offline'}
    </Chip>
  )
}

type PlayActionsCellProps = {
  play: PlayDTO
}

export function PlayActionsCell(props: PlayActionsCellProps) {
  const queryClient = useQueryClient()

  const handleAction = async (key: Key) => {
    switch (key) {
      case 'edit':
        break
      case 'remove':
        try {
          const play: RemovePlayConnectionDTO = {
            identifier: props.play.identifier,
          }

          await removePlayConnection(play)
        } catch (error) {
          console.log('Error in handleAction', error)
        } finally {
          queryClient.invalidateQueries({ queryKey: ['plays'] })
        }
        break
    }
  }

  return (
    <Dropdown className="shadow-xl" placement="bottom-end" backdrop="opaque">
      <DropdownTrigger>
        <Button variant="light" isIconOnly={true}>
          <RiMore2Line />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color="default"
        variant="flat"
        //
        closeOnSelect={true}
        disabledKeys={['play']}
        //
        onAction={(key) => {
          handleAction(key)
        }}
        //
        aria-label="Actions"
      >
        <DropdownSection showDivider>
          <DropdownItem
            key="play"
            //
            isReadOnly={true}
            startContent={<RiExchange2Line />}
          >
            {props.play.identifier}
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="edit"
            //
            startContent={<RiPencilLine />}
          >
            Edit connection
          </DropdownItem>
          <DropdownItem
            key="remove"
            //
            color="danger"
            className="text-danger"
            startContent={<RiLinkUnlink />}
          >
            Remove connection
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
