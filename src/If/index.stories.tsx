import If from './index'
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: "If",
  component: If
} as ComponentMeta<typeof If>;

const Template: ComponentStory<typeof If> = (args) => <If {...args} />;

export const MatchCondition = Template.bind({});

MatchCondition.args = {
  condition: true,
  children: "Now you see me"
}

export const NotMatchCondition = Template.bind({});

NotMatchCondition.args = {
  condition: false,
  children: "Now you see me"
}
