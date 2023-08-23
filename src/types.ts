import React from 'react';
import { MenuDataItem } from '@ant-design/pro-components';


export type RouteElement = {
  path: string;
  element: React.JSX.Element;
}

export type AgentPlugin = {
  name: string;
  description: string;
  routes: RouteElement[];
  menuItems: MenuDataItem[];
}

export interface IPlugin {
  init: () => AgentPlugin;
}
