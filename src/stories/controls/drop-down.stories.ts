import type { Meta, StoryObj } from '@storybook/angular';
import { DropDownComponent } from '../../app/controls/drop-down-component/drop-down-component';


const meta: Meta<DropDownComponent> = {
  title: 'Components/DropDown',
  component: DropDownComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', 
  },
  args: {
      draggable: true,
    options: [
      {
        value: 1,
        name: 'Male',
      },
      {
        value: 2,
        name: 'Female',
      },
      {
        value: 3,
        name: 'Other',
      },
       {
        value: 4,
        name: 'Other1',
      },
         {
        value: 5,
        name: 'Other2',
      },
        {
        value: 6,
        name: 'Other3',
      },  {
        value: 7,
        name: 'Other4',
      },  
      {
        value: 8,
        name: 'Other5',
      }, 
      
      //  {
      //   value: 9,
      //   name: 'Other6',
      // },
      //   {
      //   value: 10,
      //   name: 'Other7',
      // },  {
      //   value: 11,
      //   name: 'Other8',
      // },  {
      //   value: 12,
      //   name: 'Other9',
      // },  {
      //   value: 13,
      //   name: 'Other10',
      // },  {
      //   value: 14,
      //   name: 'Other11',
      // },  {
      //   value: 15,
      //   name: 'Other12',
      // },
      
    ],

    
  },
};

export default meta;
type Story = StoryObj<DropDownComponent>;

export const Dropdown: Story = {};
