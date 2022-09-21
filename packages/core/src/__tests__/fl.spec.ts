import { createForm } from '..'
import { attach } from './shared'

test('child field reactions', () => {
  const form = attach(createForm())
  const voidField = attach(form.createVoidField({ name: 'void' }))
  const field1 = attach(
    form.createField({
      name: 'field1',
      basePath: voidField.address,
      reactions: [
        (field) => {
          field.value = field.query('field3').getIn('value')
        },
      ],
    })
  )
  const field2 = attach(
    form.createField({
      name: 'field2',
      basePath: voidField.address,
      reactions: [
        (field) => {
          field.value = field.query('.field3').getIn('value')
        },
      ],
    })
  )
  expect(field1.value).toBeUndefined()
  expect(field2.value).toBeUndefined()
  const field3 = attach(
    form.createField({
      name: 'field3',
      basePath: voidField.address,
      value: 1,
    })
  )
  expect(field1.value).toBe(1)
  expect(field2.value).toBe(1)
  field3.value = 2
  expect(field1.value).toBe(2)
  expect(field2.value).toBe(2)
})
