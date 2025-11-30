import type { FormFieldConfig, FormFieldValidator } from '@/types/formConfig'
import type { FormItemRule } from 'element-plus'

/**
 * 将 JSON 配置的验证规则转换为 Element Plus 的验证规则
 */
export function buildValidationRules(config: FormFieldConfig): FormItemRule[] {
  const rules: FormItemRule[] = []
  const validator = config.validator

  if (!validator) {
    return rules
  }

  // 必填验证
  if (validator.required) {
    rules.push({
      required: true,
      message: validator.message || `请输入${config.name}`,
      trigger: 'blur',
    })
  }

  // 字符长度验证
  if (validator.maxCount !== undefined || validator.minCount !== undefined) {
    rules.push({
      min: validator.minCount,
      max: validator.maxCount,
      message:
        validator.message ||
        `${config.name}长度在 ${validator.minCount || 0} 到 ${validator.maxCount || '∞'} 个字符`,
      trigger: 'blur',
    })
  }

  // URL 验证
  if (validator.url) {
    rules.push({
      type: 'url',
      message: validator.message || '请输入正确的URL格式',
      trigger: 'blur',
    })
  }

  // 数字验证
  if (validator.number) {
    rules.push({
      type: 'number',
      message: validator.message || '请输入数字',
      trigger: 'blur',
    })
  }

  // 数字范围验证
  if (validator.min !== undefined || validator.max !== undefined) {
    rules.push({
      type: 'number',
      min: validator.min,
      max: validator.max,
      message:
        validator.message ||
        `${config.name}必须在 ${validator.min || '-∞'} 到 ${validator.max || '∞'} 之间`,
      trigger: 'blur',
    })
  }

  // 正则验证
  if (validator.pattern) {
    rules.push({
      pattern: new RegExp(validator.pattern),
      message: validator.message || `${config.name}格式不正确`,
      trigger: 'blur',
    })
  }

  return rules
}

/**
 * 构建整个表单的验证规则对象
 */
export function buildFormRules(formConfig: FormFieldConfig[]): Record<string, FormItemRule[]> {
  const rules: Record<string, FormItemRule[]> = {}

  formConfig.forEach((fieldConfig) => {
    rules[fieldConfig.field] = buildValidationRules(fieldConfig)
  })

  return rules
}
