import React, { PureComponent } from 'react';
import posed from 'react-pose';
import { value, spring } from 'popmotion';
import debounce from 'lodash/debounce';

const VELOCITY_THRESHOLD = 600;
const DISTANCE_PERCENTILE_THRESHOLD = 0.3;

const Draggable = posed.div({
  draggable: 'x',
  rest: {
    x: ({ offset }) => {
      return -offset;
    },
    transition: { ease: 'easeOut', duration: 500 }
  },
  dragEnd: {
    transition: ({ from, to, velocity, offset }) => {
      return spring({ from, to: -offset, velocity });
    }
  }
});

const draggableStyle = {
  display: 'flex',
  height: '100%',
  flexWrap: 'nowrap'
};

function childrenBox(root, index) {
  const rootWidth = root.clientWidth;

  const el = root.children[index];
  return {
    offset: el.offsetLeft - (rootWidth - el.offsetWidth) / 2,
    width: el.offsetWidth
  };
}

export default class PopSlideCarousel extends PureComponent {
  static defaultProps = {
    duration: 3000,
    onDragStart() {},
    onDragEnd() {},
    onTransitionEnd() {}
  };

  static getDerivedStateFromProps({ slideIndex }, { root }) {
    return root ? childrenBox(root, slideIndex) : null;
  }

  constructor(props) {
    super(props);
    this.adjustCurrentBox = debounce(this.adjustCurrentBox, 250);
  }

  state = {
    root: null,
    offset: 0,
    width: 0
  };

  x = value(0);
  preventClick = false;

  componentDidMount() {
    window.addEventListener('resize', this.adjustCurrentBox);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.adjustCurrentBox);
  }

  adjustCurrentBox = () => {
    const { slideIndex } = this.props;
    const { root } = this.state;
    this.setState(childrenBox(root, slideIndex));
  };

  goToNextSlide = () => {
    this.goToSlide(this.props.slideIndex + 1);
  };
  goToPreviousSlide = () => {
    this.goToSlide(this.props.slideIndex - 1);
  };

  goToSlide = newSlideIndex => {
    const { children } = this.props;
    if (newSlideIndex >= 0 && newSlideIndex < children.length) {
      this.props.onSlideChange(newSlideIndex);
    }
  };

  onDragStart = e => {
    this.preventClick = false;
    this.props.onDragStart();
  };

  onDragEnd = e => {
    const { offset, width } = this.state;
    const start = -offset;
    const distance = this.x.get() - start;
    const velocity = this.x.getVelocity();

    if (distance !== 0) {
      // prevents click from firing in onClickCapture
      this.preventClick = true;

      const threshold = DISTANCE_PERCENTILE_THRESHOLD * width;

      if (distance < -threshold || velocity < -VELOCITY_THRESHOLD)
        this.goToNextSlide();
      else if (distance > threshold || velocity > VELOCITY_THRESHOLD)
        this.goToPreviousSlide();
    }

    this.props.onDragEnd();
  };

  onClickCapture = e => {
    if (this.preventClick) {
      e.stopPropagation();
    }
  };

  registerRootElement = root => {
    if (root && !this.state.root) {
      const { slideIndex } = this.props;
      this.setState({
        root,
        ...childrenBox(root, slideIndex)
      });
    }
  };

  render() {
    const { children, className, style } = this.props;
    const { offset } = this.state;
    const valuesMap = { x: this.x };

    return (
      <div className={className} style={style}>
        <Draggable
          ref={this.registerRootElement}
          values={valuesMap}
          offset={offset}
          style={draggableStyle}
          onClickCapture={this.onClickCapture}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onPoseComplete={this.props.onTransitionEnd}
          poseKey={offset}
          pose={'rest'}
        >
          {children}
        </Draggable>
      </div>
    );
  }
}
