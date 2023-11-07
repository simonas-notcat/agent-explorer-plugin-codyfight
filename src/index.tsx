import React from 'react';
import { RobotOutlined } from '@ant-design/icons'

import { IPlugin } from '@veramo-community/agent-explorer-plugin';
import Operator from './Operator';
import Operators from './Operators';
import { UniqueVerifiableCredential } from '@veramo/core-types';
import { OperatorCredential } from './OperatorCredential';
import { GameActionCredential } from './GameActionCredential';

const Plugin: IPlugin = {
    //@ts-ignore
    init: (agent) => {
        return {
          name: 'Codyfight',
          description: 'AI Bot for Codyfight.com',
          icon: <RobotOutlined />,
          requiredMethods: [
            'dataStoreSaveVerifiableCredential',
            'createVerifiableCredential',
            'dataStoreGetVerifiableCredential',
          ],
          routes: [
            {
              path: '/codyfight/operator/:id',
              element: <Operator />,
            },
            {
              path: '/codyfight/operator',
              element: <Operators />,
            },

          ],
          menuItems: [
            {
              name: 'Codyfight',
              path: '/codyfight',
              icon: <RobotOutlined />,
              routes: [
                {
                  path: '/codyfight/operator',
                  name: 'Operators',
                },
              ],
            },
          ],
          getCredentialComponent: (credential: UniqueVerifiableCredential) => {
            if (credential.verifiableCredential.type?.includes('Codyfight') && credential.verifiableCredential.type?.includes('Operator')) {
              return OperatorCredential
            }
            if (credential.verifiableCredential.type?.includes('Codyfight') && credential.verifiableCredential.type?.includes('GameAction')) {
              return GameActionCredential
            }
            return undefined
          },

          
        }
    }
};

export default Plugin;