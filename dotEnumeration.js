var jsPsych = initJsPsych({
  on_finish: function(){
    window.location.href = debrifurl},
});

/* url parameters*/
var id = jsPsych.data.getURLVariable("subjectid");
var debrifurl = "https://www.jianchen.info?subjectid=".concat(id) // go to comparison task

 /* create timeline */
var timeline = []; 

/* preload images */
var preload = {
  type: jsPsychPreload,
  images: ['n1r1.png', 'n1r2.png', 'n1r3.png', 'n1r4.png','n1r5.png','n1r6.png', 'n1r7.png', 'n1r8.png',
           'n2r1.png', 'n2r2.png', 'n2r3.png', 'n2r4.png','n2r5.png','n2r6.png', 'n2r7.png', 'n2r8.png',
           'n3r1.png', 'n3r2.png', 'n3r3.png', 'n3r4.png','n3r5.png','n3r6.png', 'n3r7.png', 'n3r8.png',
           'n4r1.png', 'n4r2.png', 'n4r3.png', 'n4r4.png','n4r5.png','n4r6.png', 'n4r7.png', 'n4r8.png',
           'n5r1.png', 'n5r2.png', 'n5r3.png', 'n5r4.png','n5r5.png','n5r6.png', 'n5r7.png', 'n5r8.png',
           'n6r1.png', 'n6r2.png', 'n6r3.png', 'n6r4.png','n6r5.png','n6r6.png', 'n6r7.png', 'n6r8.png',
           'n7r1.png', 'n7r2.png', 'n7r3.png', 'n7r4.png','n7r5.png','n7r6.png', 'n7r7.png', 'n7r8.png',
           'n8r1.png', 'n8r2.png', 'n8r3.png', 'n8r4.png','n8r5.png','n8r6.png', 'n8r7.png', 'n8r8.png',
           'n9r1.png', 'n9r2.png', 'n9r3.png', 'n9r4.png','n9r5.png','n9r6.png', 'n9r7.png', 'n9r8.png',
           'n10r1.png', 'n10r2.png', 'n10r3.png', 'n10r4.png',
           ]};
timeline.push(preload);

// settings 
var pic_duration = 5000;
var fix_duration = [200,500,700,900,1000];
var pic_size = 400;


var FullScreenOn = {
    type: jsPsychFullscreen,
    message: "<p>The experiment will be in full screen mode once you click on the button.</p>",
    button_label: 'Full Screen Mode',
    fullscreen_mode: true
}
timeline.push(FullScreenOn)

/* instructions */
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>Welcome to the Dot Enumeration Task.</p>' +
            '<p>In this task, we would like to know, as fast as you can and without making any mistakes, how many dots you see on the screen.</p>'+
            '<p>A cross will appear on the screen followed by a display of dots. </p>'+ 
            'Press the SPACE BAR as soon as you identify how many dots there are on the screen, and then select your answer immediately.<p>'+
            '<p><b>Please respond as accurately and quickly as possible.</b></p>'+
            'Press SPACEBAR to begin practice trials',
  choices: [' '],
};
timeline.push(welcome);


/* defining practice stimululi*/
var prac_stimuli = [
  {prac_stimulus: 'n1r1.png', correct_response:0},
  {prac_stimulus: 'n2r1.png', correct_response:1},
  {prac_stimulus: 'n3r1.png', correct_response:2},
  {prac_stimulus: 'n4r1.png', correct_response:3},
  {prac_stimulus: 'n5r1.png', correct_response:4},
  {prac_stimulus: 'n6r1.png', correct_response:5},
  {prac_stimulus: 'n7r1.png', correct_response:6},
  {prac_stimulus: 'n8r1.png', correct_response:7},
  {prac_stimulus: 'n9r1.png', correct_response:8},
  ];
  
  
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:48px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: jsPsych.randomization.sampleWithReplacement(fix_duration, 1),
  data: {phase: 'fixation',},
};


var prac_stimulus = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('prac_stimulus'),
  stimulus_height: pic_size,  
  maintain_aspect_ratio: true,
  choices: [' '],
  data: {
    phase: 'prac_stimulus',
    prac_stimli:jsPsych.timelineVariable('prac_stimulus'),
  },
};

// response and feedback
var msg;
var prac_response = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p>How many dots were on the screen?</p>',
  choices: ['1','2','3','4','5','6','7','8','9','10'],
  prompt: "<p>Select a number</p>",
  data:{
    phase: 'practice_resp',
    correct_responses: jsPsych.timelineVariable('correct_response'),
  },
  on_finish: function(data){
    data.correct = data.response==jsPsych.timelineVariable('correct_response');
    if (data.correct){
      msg = "<p style='font-size:22px; color:green;'>Correct!</p>";
    } else {
      msg = "<p style='font-size:22px; color:red;'>Incorrect!</p>";
    }
  }
};

var practice_feedback = {
	type: jsPsychHtmlKeyboardResponse,
	trial_duration: 1000,
	choices: "NO_KEYS",
	stimulus: function(){return msg;},
};


var practice_procedure = {
  timeline: [fixation, prac_stimulus, prac_response, practice_feedback],
  timeline_variables: jsPsych.randomization.shuffleNoRepeats(prac_stimuli), // make sure that neighboring elements in the array are different.
  // randomize_order: true,
  repetitions: 1,
};	
timeline.push(practice_procedure);






// Formal Experiment 

var pre_test = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>This is the end of the practice trials. You will now begin the experiment trials.  </p> '+
            'Feedback will NOT be provided</p> ' + 
            'Press Spacebar to begin.</p>',
  choices: [' '],
}; 
timeline.push(pre_test);



var test_stimuli = [
  {stimulus: "n1r1.png",  correct_response: 0},
  { stimulus: "n1r2.png",  correct_response: 0},
  { stimulus: "n1r3.png",  correct_response: 0},
  { stimulus: "n1r4.png",  correct_response: 0},
  { stimulus: "n1r5.png",  correct_response: 0},
  { stimulus: "n1r6.png",  correct_response: 0},
  { stimulus: "n1r7.png",  correct_response: 0},
  { stimulus: "n1r8.png",  correct_response: 0},

  {stimulus: "n2r1.png",  correct_response: 1},
  { stimulus: "n2r2.png",  correct_response: 1},
  { stimulus: "n2r3.png",  correct_response: 1},
  { stimulus: "n2r4.png",  correct_response: 1},
  { stimulus: "n2r5.png",  correct_response: 1},
  { stimulus: "n2r6.png",  correct_response: 1},
  { stimulus: "n2r7.png",  correct_response: 1},
  { stimulus: "n2r8.png",  correct_response: 1},

  {stimulus: "n3r1.png",  correct_response: 2},
  { stimulus: "n3r2.png",  correct_response: 2},
  { stimulus: "n3r3.png",  correct_response: 2},
  { stimulus: "n3r4.png",  correct_response: 2},
  { stimulus: "n3r5.png",  correct_response: 2},
  { stimulus: "n3r6.png",  correct_response: 2},
  { stimulus: "n3r7.png",  correct_response: 2},
  { stimulus: "n3r8.png",  correct_response: 2},
  
  {stimulus: "n4r1.png",  correct_response: 3},
  { stimulus: "n4r2.png",  correct_response: 3},
  { stimulus: "n4r3.png",  correct_response: 3},
  { stimulus: "n4r4.png",  correct_response: 3},
  { stimulus: "n4r5.png",  correct_response: 3},
  { stimulus: "n4r6.png",  correct_response: 3},
  { stimulus: "n4r7.png",  correct_response: 3},
  { stimulus: "n4r8.png",  correct_response: 3},

  {stimulus: "n5r1.png",  correct_response: 4},
  { stimulus: "n5r2.png",  correct_response: 4},
  { stimulus: "n5r3.png",  correct_response: 4},
  { stimulus: "n5r4.png",  correct_response: 4},
  { stimulus: "n5r5.png",  correct_response: 4},
  { stimulus: "n5r6.png",  correct_response: 4},
  { stimulus: "n5r7.png",  correct_response: 4},
  { stimulus: "n5r8.png",  correct_response: 4},

  {stimulus: "n6r1.png",  correct_response: 5},
  { stimulus: "n6r2.png",  correct_response: 5},
  { stimulus: "n6r3.png",  correct_response: 5},
  { stimulus: "n6r4.png",  correct_response: 5},
  { stimulus: "n6r5.png",  correct_response: 5},
  { stimulus: "n6r6.png",  correct_response: 5},
  { stimulus: "n6r7.png",  correct_response: 5},
  { stimulus: "n6r8.png",  correct_response: 5},
  
  {stimulus: "n7r1.png",  correct_response: 6},
  { stimulus: "n7r2.png",  correct_response: 6},
  { stimulus: "n7r3.png",  correct_response: 6},
  { stimulus: "n7r4.png",  correct_response: 6},
  { stimulus: "n7r5.png",  correct_response: 6},
  { stimulus: "n7r6.png",  correct_response: 6},
  { stimulus: "n7r7.png",  correct_response: 6},
  { stimulus: "n7r8.png",  correct_response: 6},
  
  {stimulus: "n8r1.png",  correct_response: 7},
  { stimulus: "n8r2.png",  correct_response: 7},
  { stimulus: "n8r3.png",  correct_response: 7},
  { stimulus: "n8r4.png",  correct_response: 7},
  { stimulus: "n8r5.png",  correct_response: 7},
  { stimulus: "n8r6.png",  correct_response: 7},
  { stimulus: "n8r7.png",  correct_response: 7},
  { stimulus: "n8r8.png",  correct_response: 7},
  
  {stimulus: "n9r1.png",  correct_response: 8},
  { stimulus: "n9r2.png",  correct_response: 8},
  { stimulus: "n9r3.png",  correct_response: 8},
  { stimulus: "n9r4.png",  correct_response: 8},
  { stimulus: "n9r5.png",  correct_response: 8},
  { stimulus: "n9r6.png",  correct_response: 8},
  { stimulus: "n9r7.png",  correct_response: 8},
  { stimulus: "n9r8.png",  correct_response: 8},
  
  { stimulus: "n10r1.png",  correct_response: 9},
  { stimulus: "n10r2.png",  correct_response: 9},
  { stimulus: "n10r3.png",  correct_response: 9},
  { stimulus: "n10r4.png",  correct_response: 9},
];


/* define break trial */
var trial_count = 0;

var break_trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:  "<p style='font-size: 18px'>Please take a short break if needed.</p>" + 
          "<p style='font-size: 18px'>When you are ready, continue by pressing the SPACEBAR.</p>",
};


var break_conditional = {
  timeline: [break_trial],
  // block rest determination
  conditional_function: function() {
    // increment trial count - in first run through the timeline variables procedure, trial_count will be equal to 1
    trial_count++;
    if (trial_count % 41 == 0 && trial_count!=0) {
      // if the trial count is divisible by 40, then run the break trial
      return true;
    } else {
      // otherwise skip the break trial
      return false;
    }
  }
};




var test_stimulus = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  stimulus_height: pic_size,  
  maintain_aspect_ratio: true,
  choices: [' '],
  data: {
    phase: 'test_stimulus',
    test_stimli:jsPsych.timelineVariable('stimulus'),
  },
};


var test_response = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p>How many dots were on the screen?</p>',
  choices: ['1','2','3','4','5','6','7','8','9','10'],
  prompt: "<p>Select a number</p>",
  data:{
    phase: 'test_resp',
    correct_responses: jsPsych.timelineVariable('correct_response'),
  },
  on_finish: function(data){
    data.correct = data.response==jsPsych.timelineVariable('correct_response');},
};



var test_procedure = {
  timeline: [fixation, test_stimulus, test_response, break_conditional],
  timeline_variables: jsPsych.randomization.shuffleNoRepeats(test_stimuli),
  // randomize_order: true,
  repetitions: 2,
};	
timeline.push(test_procedure);




var post_test = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>You have finished the Dot Enumeration Task.</p> '+
            'Press Spacebar to start next task.</p>',
  choices: [' '],
}; 
timeline.push(post_test);





/* start the experiment */
jsPsych.run(timeline);
