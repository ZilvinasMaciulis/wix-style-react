import React from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.scss';
import './Carousel.global.scss';
import ChevronLeftLarge from '../new-icons/ChevronLeftLarge';
import ChevronRightLarge from '../new-icons/ChevronRightLarge';
import Pagination from './Pagination';
import Loader from '../Loader';
import Proportion from '../Proportion';
import SliderArrow from './SliderArrow';
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
      sliderSettings: this._resolveSliderSettings(props),
    };
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
    infinite,
    autoplay,
    initialSlideIndex,
    arrowSkin,
    arrowSize,
  }) => {
    return {
      infinite,
      autoplay,
      speed: TRANSITION_SPEED,
      autoplaySpeed: AUTOPLAY_SPEED,
      initialSlideIndex,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: (
        <SliderArrow
          arrowSize={arrowSize}
          arrowSkin={arrowSkin}
          dataHook={dataHooks.nextButton}
          icon={<ChevronRightLarge />}
        />
      ),
      prevArrow: (
        <SliderArrow
          arrowSize={arrowSize}
          arrowSkin={arrowSkin}
          dataHook={dataHooks.prevButton}
          icon={<ChevronLeftLarge />}
        />
      ),
      appendDots: pages => <Pagination>{pages}</Pagination>,
      customPaging: i => (
        <div className={styles.dotNavigator} data-hook={`page-navigation-${i}`}>
          {i}
        </div>
      ),
    };
  };

  render() {
    const { dataHook, images } = this.props;

    return (
      <Proportion
        aspectRatio={Proportion.PREDEFINED_RATIOS.landscape}
        className={styles.imagesContainerLayout}
      >
        <div data-hook={dataHook}>
          <div
            className={styles.sliderContainer}
            data-is-loading={this._isLoading()}
          >
            <Slider {...this.state.sliderSettings}>
              {images ? this._renderImages(images) : null}
            </Slider>
          </div>
        </div>
        {this._isLoading() ? (
          <div className={styles.loader}>
            <Loader dataHook="loader" size="small" />
          </div>
        ) : null}
      </Proportion>
    );
  }
}

Carousel.propTypes = {
  dataHook: PropTypes.string,
  /** Array of images object where each object has a "src" key with a value of an image url that will be the image source in \<img src="your_src" /\> */
  images: PropTypes.array.isRequired,
  /** Images loop endlessly */
  infinite: PropTypes.bool,
  /** Auto-playing of images */
  autoplay: PropTypes.bool,
  /** Index of the slide to start on */
  initialSlideIndex: PropTypes.number,
  /** Arrow skin */
  arrowSkin: PropTypes.oneOf(['standard', 'inverted']),
  /** Arrow size */
  arrowSize: PropTypes.oneOf(['medium', 'small']),
};

Carousel.defaultProps = {
  images: [],
  infinite: true,
  autoplay: false,
  initialSlideIndex: 0,
  arrowSkin: 'standard',
  arrowSize: 'medium',
};

Carousel.displayName = 'Carousel';

export default Carousel;
