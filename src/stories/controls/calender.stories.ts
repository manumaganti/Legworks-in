import type { Meta, StoryObj } from '@storybook/angular';
import { CalenderComponent } from '../../app/controls/calender-component/calender-component';


const meta: Meta<CalenderComponent> = {
  title: 'Components/Calender',
  component: CalenderComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<CalenderComponent>;

export const Default: Story = {
  args: {},
};