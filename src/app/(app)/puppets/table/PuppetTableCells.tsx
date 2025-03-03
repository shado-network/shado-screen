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
  RiLinkUnlink,
  RiMore2Line,
  RiPencilLine,
  RiUserLine,
} from 'react-icons/ri'

import {
  getPuppetData,
  getPuppetHealth,
  removePuppetConnection,
} from '../logic'
import type { PuppetDTO, RemovePuppetConnectionDTO } from '../logic'

type PuppetDataCellProps = {
  puppet: PuppetDTO
}

export function PuppetDataCell(props: PuppetDataCellProps) {
  const queries = {
    puppetData: useQuery({
      queryKey: ['puppet', props.puppet.identifier, 'data'],
      queryFn: () => getPuppetData(props.puppet),
      // enabled: true,
      // placeholderData: keepPreviousData,
    }),
  }

  return (
    <Link href={`/puppets/${props.puppet.identifier}/details`}>
      <div className="flex gap-3">
        <div>
          <Avatar
            name={
              queries.puppetData.data?.data?.puppet.name ||
              props.puppet.identifier
            }
            src={queries.puppetData.data?.data?.puppet.image}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-md text-white">
            {queries.puppetData.data?.data?.puppet.name ||
              props.puppet.identifier}
          </span>
          <span className="text-sm text-neutral-500">
            {props.puppet.http_url}
          </span>
          {/* <span>{puppet.key}</span> */}
        </div>
      </div>
    </Link>
  )
}

type PuppetStatusCellProps = {
  puppet: PuppetDTO
}

export function PuppetStatusCell(props: PuppetStatusCellProps) {
  const queries = {
    puppetHealth: useQuery({
      queryKey: ['puppet', props.puppet.identifier, 'health'],
      queryFn: () => getPuppetHealth(props.puppet),
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
  const puppetStatus =
    queries.puppetHealth.data?.timestamp >= Date.now() - 1 * 60 * 1000
      ? 'online'
      : 'offline'

  return (
    <Chip
      className="uppercase"
      color={statusColorMap[puppetStatus || 'offline']}
      size="sm"
      variant="flat"
    >
      {puppetStatus || 'offline'}
    </Chip>
  )
}

type PuppetActionsCellProps = {
  puppet: PuppetDTO
}

export function PuppetActionsCell(props: PuppetActionsCellProps) {
  const queryClient = useQueryClient()

  const handleAction = async (key: Key) => {
    switch (key) {
      case 'edit':
        break
      case 'remove':
        try {
          const puppet: RemovePuppetConnectionDTO = {
            identifier: props.puppet.identifier,
          }

          await removePuppetConnection(puppet)
        } catch (error) {
          console.log('Error in handleAction', error)
        } finally {
          queryClient.invalidateQueries({ queryKey: ['puppets'] })
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
        disabledKeys={['puppet']}
        //
        onAction={(key) => {
          handleAction(key)
        }}
        //
        aria-label="Actions"
      >
        <DropdownSection showDivider>
          <DropdownItem
            key="puppet"
            //
            isReadOnly={true}
            startContent={<RiUserLine />}
          >
            {props.puppet.identifier}
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
