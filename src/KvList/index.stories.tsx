import KvList from './index'
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: "KvList",
  component: KvList
} as ComponentMeta<typeof KvList>;

const Template: ComponentStory<typeof KvList> = (args) => <KvList {...args} />;

export const SimpleKvList = Template.bind({});

SimpleKvList.args = {
  withSeperator: true,
  labelWidth: 120,
  records: {
    "Name:": "Patrick Ren",
    "Work:": "Frontend Engineer"
  },
  style: {
    item: { minHeight: 24, fontSize: 18 }
  }
}

