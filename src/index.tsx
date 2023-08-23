import React from 'react';
import { RobotOutlined } from '@ant-design/icons'

import { IPlugin } from './types';
import Operator from './Operator';
import Operators from './Operators';

const Plugin: IPlugin = {
    //@ts-ignore
    init: (agent) => {
        return {
          name: 'Codyfight',
          description: 'AI Bot for Codyfight.com',
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
                {
                  path: '/codyfight/sessions',
                  name: 'Played sessions',
                },
              ],
            },
          ],
          
        }
    }
};

export default Plugin;