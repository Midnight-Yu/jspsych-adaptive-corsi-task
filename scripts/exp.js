var test_block_arrangement = [
    {x:50, y:10},
    {x:50, y:20},
    {x:50, y:30},
    {x:50, y:40},
    {x:50, y:50},
    {x:50, y:60},
];

var block_size = 9;

let jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data
            .get()
            .localSave('csv', 'data.csv')
    },
    on_close: function () {
        jsPsych.data
            .get()
            .localSave('csv', 'data.csv')
    }
}); // 初始化jsPsych

//额外函数和代码
function endExperiment(e) {
    if (e.key === 'Escape') {
        jsPsych.endExperiment('实验已终止');
        document.removeEventListener("keydown", endExperiment);
    }
};

let instruction = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class='experiment-instruction'> 
    <p>这是一段实验指导语</p>
    <p>按空格继续</p>
    </div>
    `,
    post_trial_gap: 500
}

// 试一下corsi_block是个什么东西
let show_sequence = {
    type: jsPsychCorsiBlocks,
    blocks: test_block_arrangement,
    block_size : block_size,
    sequence: [3, 1, 2, 4, 5],
    mode: 'display'
}

let response = {
    type: jsPsychCorsiBlocks,
    blocks: test_block_arrangement,
    block_size : block_size,
    sequence: [3, 1, 2, 4, 5],
    mode: 'input'
}

let ending = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class='experiment-instruction'><p>实验已结束</p></div>
    `,
    post_trial_gap: 500
}

jsPsych.run([
    instruction, show_sequence, response, ending
])

