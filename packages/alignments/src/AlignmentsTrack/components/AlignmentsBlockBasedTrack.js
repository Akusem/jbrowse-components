import { getConf } from '@gmod/jbrowse-core/configuration'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { getParent } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React from 'react'
import Track from '@gmod/jbrowse-plugin-linear-genome-view/src/BasicTrack/components/Track'
import AlignmentsTrackBlocks from './AlignmentsTrackBlocks'

function AlignmentsBlockBasedTrack(props) {
  const { model, children } = props
  return (
    <Track {...props} trackId={getConf(model, 'trackId')}>
      {model.trackMessageComponent ? (
        <model.trackMessageComponent model={model} />
      ) : (
        <AlignmentsTrackBlocks
          {...props}
          viewModel={getParent(getParent(model))}
        />
      )}
      {children}
    </Track>
  )
}

AlignmentsBlockBasedTrack.propTypes = {
  model: MobxPropTypes.objectOrObservableObject.isRequired,
  children: PropTypes.node,
}

AlignmentsBlockBasedTrack.defaultProps = {
  children: null,
}

export default observer(AlignmentsBlockBasedTrack)