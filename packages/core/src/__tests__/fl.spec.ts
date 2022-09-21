import { autorun } from '@formily/reactive'
import { createForm, onFieldReact } from '..'
import { attach, sleep } from './shared'

test('field linkage', () => {
  const handler1 = jest.fn()
  const handler2 = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFieldReact('field2')
      },
    })
  )

  const layoutField = attach(form.createVoidField({ name: 'layout' }))

  const field1 = attach(
    form.createField({
      name: 'field1',
      basePath: layoutField.address,
    })
  )
  expect(handler1).toBeCalledTimes(0)
  expect(handler2).toBeCalledTimes(0)
  autorun(() => {
    const field2Value = field1.query('field2').getIn('value')
    handler1()
  })
  autorun(() => {
    const field3Value = field1.query('.field3').getIn('value')
    handler2()
  })
  expect(handler1).toBeCalledTimes(1)
  expect(handler2).toBeCalledTimes(1)
  const field2 = attach(
    form.createField({
      name: 'field2',
      basePath: layoutField.address,
    })
  )
  const field3 = attach(
    form.createField({
      name: 'field3',
      basePath: 'layout',
    })
  )
  expect(handler1).toBeCalledTimes(2)
  expect(handler2).toBeCalledTimes(2)
})
