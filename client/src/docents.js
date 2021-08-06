const docentTalk = () => {
  ml5.imageClassifier('MobileNet')
    .then((classifier) => {
      console.log('within first block', classifier);
      return classifier.classify(document.getElementById('art-piece'));
    })
    .then(results => console.log('made it to second block', results)
    )
    .catch(err => console.log(err));
};

// const darkDocent = ml5.imageClassifier('DarkNet', darkReady);
// const doodleDocent = ml5.imageClassifier('doodleNet', doodleReady);

// };

export default docentTalk;