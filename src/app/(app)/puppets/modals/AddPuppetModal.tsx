'use client'

import { useQueryClient } from '@tanstack/react-query'
import type { FormEvent } from 'react'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react'

import { Button, Form, Input } from '@heroui/react'

import { RiLink } from 'react-icons/ri'

import { addPuppetConnection } from '../logic'
import type { AddPuppetConnectionDTO } from '../logic'

export default function AddPuppetModal() {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    onClose: () => void,
  ) => {
    e.preventDefault()

    try {
      const data = Object.fromEntries(new FormData(e.currentTarget))
      await addPuppetConnection(data as AddPuppetConnectionDTO)
    } catch (error) {
      console.log('Error in onSubmit', error)
    } finally {
      queryClient.invalidateQueries({ queryKey: ['puppets'] })
      onClose()
    }
  }

  return (
    <>
      <Button
        color="primary"
        variant="light"
        size="sm"
        startContent={<RiLink />}
        className="uppercase"
        //
        onPress={onOpen}
      >
        Connect
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        //
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        //
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Form
                className="w-full [&>*]:w-full"
                validationBehavior="native"
                onSubmit={(e) => {
                  onSubmit(e, onClose)
                }}
              >
                <ModalHeader className="flex flex-col gap-1 uppercase">
                  Connect a Puppet
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="identifier"
                    type="text"
                    label="Identifier"
                    placeholder="puppet_identifier"
                    isRequired
                    //
                    labelPlacement="outside"
                    //
                    errorMessage="Please enter a valid shado-puppet identifier"
                  />

                  <Input
                    name="key"
                    type="text"
                    label="Auth Key"
                    placeholder="sp-"
                    isRequired
                    //
                    labelPlacement="outside"
                    //
                    errorMessage="Please enter a valid shado-puppet auth key"
                  />

                  <Input
                    name="http_url"
                    type="text"
                    label="HTTP URL"
                    placeholder="https://"
                    isRequired
                    //
                    labelPlacement="outside"
                    //
                    errorMessage="Please enter a valid shado-puppet HTTP URL"
                  />

                  <Input
                    name="ws_url"
                    type="text"
                    label="WebSocket URL"
                    placeholder="wss://"
                    isRequired
                    //
                    labelPlacement="outside"
                    //
                    errorMessage="Please enter a valid shado-puppet WebSocket URL"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    className="uppercase"
                    //
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    className="uppercase text-black"
                  >
                    Save Connection
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
