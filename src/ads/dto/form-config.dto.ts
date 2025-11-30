import { ApiProperty } from '@nestjs/swagger';

export enum FormComponentType {
  Input = 'Input',
  TextArea = 'TextArea',
  InputNumber = 'InputNumber',
  Select = 'Select',
  DatePicker = 'DatePicker',
  Upload = 'Upload',
}

export class FormFieldValidator {
  @ApiProperty({ required: false, description: '最大字符数' })
  maxCount?: number;

  @ApiProperty({ required: false, description: '最小字符数' })
  minCount?: number;

  @ApiProperty({ required: false, description: '是否必填' })
  required?: boolean;

  @ApiProperty({ required: false, description: '是否为URL格式' })
  url?: boolean;

  @ApiProperty({ required: false, description: '是否为数字' })
  number?: boolean;

  @ApiProperty({ required: false, description: '最小值（数字类型）' })
  min?: number;

  @ApiProperty({ required: false, description: '最大值（数字类型）' })
  max?: number;

  @ApiProperty({ required: false, description: '正则表达式' })
  pattern?: string;

  @ApiProperty({ required: false, description: '自定义错误信息' })
  message?: string;
}

export class FormFieldConfig {
  @ApiProperty({ description: '字段名称（对应实体字段）' })
  field: string;

  @ApiProperty({ description: '字段显示名称' })
  name: string;

  @ApiProperty({ description: '表单组件类型', enum: FormComponentType })
  component: FormComponentType;

  @ApiProperty({ required: false, description: '字段验证规则' })
  validator?: FormFieldValidator;

  @ApiProperty({ required: false, description: '占位符文本' })
  placeholder?: string;

  @ApiProperty({ required: false, description: '默认值' })
  defaultValue?: any;

  @ApiProperty({ required: false, description: '是否禁用' })
  disabled?: boolean;

  @ApiProperty({ required: false, description: '组件额外属性' })
  componentProps?: Record<string, any>;

  @ApiProperty({ required: false, description: '字段提示信息' })
  tooltip?: string;
}

export class FormConfigResponse {
  @ApiProperty({ description: '表单标题' })
  title: string;

  @ApiProperty({ description: '表单描述' })
  description?: string;

  @ApiProperty({ description: '表单字段配置列表', type: [FormFieldConfig] })
  fields: FormFieldConfig[];
}
