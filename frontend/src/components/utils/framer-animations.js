export const appearFromRight = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const appearFromRightMinDelay = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.5,
    },
  },
};


export const fadeInMidDelay = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 1.2
    }
  }
}

export const appearFromLeftLgDelay = {
  hidden: {
    opacity: 0,
    x: -200,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 2
    }
  }

}
