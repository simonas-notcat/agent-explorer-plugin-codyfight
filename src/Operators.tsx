import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useVeramo } from '@veramo-community/veramo-react'
import { PageContainer} from '@ant-design/pro-components'
import { ICredentialIssuer, IDataStore, IDataStoreORM } from '@veramo/core'
import { VerifiableCredentialComponent } from '@veramo-community/agent-explorer-plugin'
import { Button, List, notification } from 'antd'
import { RobotOutlined } from '@ant-design/icons'
import NewOperatorModalForm, {
  NewOperatorModalValues,
} from './NewOperatorModalForm'
import { GameAPI } from './lib/codyfight-game-client/src/GameApi'
import { createOperatorCredential, createProfileCredential } from './utils/credentials'


const Operators = () => {
  const navigate = useNavigate()
  const { agent } = useVeramo<IDataStoreORM & ICredentialIssuer & IDataStoreORM & IDataStore>()
  const [isNewOperatorModalVisible, setIsNewOperatorModalVisible] = useState(false)

  
  const { data: credentials, isLoading, refetch } = useQuery(
    ['credentials', { agentId: agent?.context.name }],
    () =>
      agent?.dataStoreORMGetVerifiableCredentials({
        where: [{
          column: 'type', value: ['VerifiableCredential,Codyfight,Operator']
        }],
        order: [{ column: 'issuanceDate', direction: 'DESC' }],
      }),
  )

  const handleNewOperatorOk = async (values: NewOperatorModalValues) => {
    setIsNewOperatorModalVisible(false)
    try {
      if (!agent) { return false }
      const api = new GameAPI()
      const game = await api.check(values.ckey)



      const identifier = await agent?.didManagerCreate({
        alias: game.players.bearer.name,
        provider: 'did:peer',
        options: {
          num_algo: 2,
          service: {
            id: '1234',
            type: 'DIDCommMessaging',
            serviceEndpoint: values.mediator,
            description: 'a DIDComm endpoint',
          },
        },
      })
      
      const profile = {
        id: identifier.did,
        name: game.players.bearer.name,
        picture: `https://codyfight.b-cdn.net/game/codyfighter/${game.players.bearer.codyfighter.type}.png` ,
      }

      const credential = await createOperatorCredential(agent, {ckey: values.ckey, id: identifier.did})
      const profileCredential = await createProfileCredential(agent, profile)
  
      if (credential && profileCredential) {
        await agent?.dataStoreSaveVerifiableCredential({
          verifiableCredential: credential,
        })
        await agent?.dataStoreSaveVerifiableCredential({
          verifiableCredential: profileCredential,
        })
          
        refetch()
        notification.success({
          message: 'Operator created',
        })
  
      }
    } catch (e: any) {
      const msg = e?.response?.data?.message || e.message
      notification.error({
        message: 'Error creating game',
        description: msg ,
      })
    }
  }


  return (
    <PageContainer
    extra={[
      <Button
        key={'copy'}
        icon={<RobotOutlined />}
        type="primary"
        onClick={() => setIsNewOperatorModalVisible(true)}
      >New Operator</Button>,
    ]}
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={credentials}
        renderItem={(item) => (  
          <VerifiableCredentialComponent credential={item} />
        )}
      />
      {agent?.availableMethods().includes('createVerifiableCredential') && (
        <NewOperatorModalForm
          visible={isNewOperatorModalVisible}
          onOk={handleNewOperatorOk}
          onCancel={() => {
            setIsNewOperatorModalVisible(false)
          }}
        />
      )}
    </PageContainer>
  )
}

export default Operators
