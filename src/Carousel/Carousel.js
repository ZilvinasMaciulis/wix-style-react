import React from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.scss';
import './Carousel.global.scss';
import ChevronLeftLarge from '../new-icons/ChevronLeftLarge';
import ChevronRightLarge from '../new-icons/ChevronRightLarge';
import IconButton from '../IconButton/IconButton';
import Pagination from './Pagination';
import Loader from '../Loader';
import Slider from 'react-slick';

const AUTOPLAY_SPEED = 2000;
const TRANSITION_SPEED = 600;
const dataHooks = {
  imagesContainer: 'images-container',
  carouselImage: 'carousel-img',
  loader: 'loader',
  prevButton: 'prev-button',
  nextButton: 'next-button',
};

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedImageCount: 0,
    };
  }

  componentWillMount() {
    this.sliderSettings = this._resolveSliderSettings(this.props);
  }

  _renderImages = images => {
    return images.map((image, index) => (
      <div key={index} data-hook={dataHooks.imagesContainer}>
        <img
          src={image.src}
          data-hook={dataHooks.carouselImage}
          className={styles.image}
          onLoad={() => this._onImageLoad()}
        />
      </div>
    ));
  };

  _onImageLoad() {
    this.setState(state => {
      const loadedImageCount = state.loadedImageCount + 1;
      return {
        loadedImageCount,
      };
    });
  }

  _isLoading() {
    return this.state.loadedImageCount < this.props.images.length;
  }

  _resolveSliderSettings = ({
    dots,
    infinite,
    autoplay,
    autoplaySpeed,
    speed,
    initialSlide,
  }) => {
    const PrevButton = arrowProps => {
      const { currentSlide, slideCount, ...remainingProps } = arrowProps;

      return (
        <div {...remainingProps}>
          <IconButton dataHook={dataHooks.prevButton} priority="secondary">
            <ChevronLeftLarge />
          </IconButton>
        </div>
      );
    };

    const NextButton = arrowProps => {
      const { currentSlide, slideCount, ...remainingProps } = arrowProps;

      return (
        <div {...remainingProps}>
          <IconButton dataHook={dataHooks.nextButton} priority="secondary">
            <ChevronRightLarge />
          </IconButton>
        </div>
      );
    };

    return {
      infinite,
      autoplay,
      autoplaySpeed,
      speed,
      dots,
      initialSlide,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextButton />,
      prevArrow: <PrevButton />,
      appendDots: pages => <Pagination>{pages}</Pagination>,
      customPaging: i => (
        <div className={styles.dotNavigator} data-hook={`page-navigation-${i}`}>
          {i}
        </div>
      ),
    };
  };

  _setLoadedSlides = () => {
    this.setState(state => ({
      loadedImageCount: state.loadedImageCount + 1,
    }));
  };

  render() {
    const { dataHook, images } = this.props;

    return (
      <div data-hook={dataHook}>
        <div
          className={styles.sliderContainer}
          data-is-loading={this._isLoading()}
        >
          <Slider {...this.sliderSettings}>
            {images ? this._renderImages(images) : null}
          </Slider>
        </div>
        {this._isLoading() ? (
          <div className={styles.loader}>
            <Loader dataHook="loader" size="small" />
          </div>
        ) : null}
      </div>
    );
  }
}

//update images on imageUpdate
Carousel.propTypes = {
  dataHook: PropTypes.string,
  /** Array of strings where each string is a src of an image (in \<img src="your_src" /\>) */
  images: PropTypes.array.isRequired,
  /** Images loop endlessly */
  infinite: PropTypes.bool,
  /** Auto-playing of images */
  autoplay: PropTypes.bool,
  /** Show dot indicators */
  dots: PropTypes.bool,
  /** Index of the slide to start on */
  initialSlide: PropTypes.number,
};

Carousel.defaultProps = {
  infinite: true,
  images: [],
  autoplay: false,
  initialSlide: 0,
  autoplaySpeed: AUTOPLAY_SPEED,
  speed: TRANSITION_SPEED,
  dots: true,
};
Carousel.displayName = 'Carousel';

export default Carousel;
