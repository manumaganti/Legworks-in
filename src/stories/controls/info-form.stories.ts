import type { Meta, StoryObj } from '@storybook/angular';
import { InfoFormComponent } from '../../app/controls/info-form-component/info-form-component';


const meta: Meta<InfoFormComponent> = {
  title: 'Components/InfoForm',
  component: InfoFormComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<InfoFormComponent>;

export const Default: Story = {
  args: {},
};