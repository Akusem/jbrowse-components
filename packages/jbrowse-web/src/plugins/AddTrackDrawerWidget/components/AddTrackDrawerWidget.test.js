import { createMount, createShallow } from '@material-ui/core/test-utils'
import { Provider } from 'mobx-react'
import React from 'react'
import JBrowse from '../../../JBrowse'
import AddTrackDrawerWidget from './AddTrackDrawerWidget'

jest.mock('shortid', () => ({ generate: 'testid' }))

describe('<AddTrackDrawerWidget />', () => {
  let shallow
  let mount
  let jbrowse
  let rootModel

  beforeAll(() => {
    shallow = createShallow()
    mount = createMount()
    jbrowse = new JBrowse().configure({ configId: 'testing' })
    rootModel = jbrowse.model
    const view = rootModel.addView('LinearGenomeView')
    rootModel.addDrawerWidget('AddTrackDrawerWidget', 'addTrackDrawerWidget', {
      view: view.id,
    })
  })

  it('shallowly renders', () => {
    const wrapper = shallow(<AddTrackDrawerWidget rootModel={rootModel} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('mounts', () => {
    const preWrap = mount(
      <Provider rootModel={rootModel}>
        <AddTrackDrawerWidget
          model={rootModel.drawerWidgets.get('addTrackDrawerWidget')}
        />
      </Provider>,
    )
    const wrapper = preWrap.find('AddTrackDrawerWidget')
    expect(wrapper).toMatchSnapshot()
    const instance = wrapper.instance()
    instance.setState({ trackData: { uri: 'test.bam' } })
    instance.handleNext()
    instance.handleBack()
    instance.handleNext()
    wrapper.update()
    instance.setState({ trackName: 'test track' })
    instance.handleNext()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })
})