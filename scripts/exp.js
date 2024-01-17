// 全局参数初始化
//方块布局
var test_block_arrangement = [ 
    {x:30, y:30}, {x:40, y:30}, {x:50, y:30}, {x:60, y:30}, {x:70, y:30},
    {x:30, y:40}, {x:40, y:40}, {x:50, y:40}, {x:60, y:40}, {x:70, y:40},
    {x:30, y:50}, {x:40, y:50}, {x:50, y:50}, {x:60, y:50}, {x:70, y:50},
    {x:30, y:60}, {x:40, y:60}, {x:50, y:60}, {x:60, y:60}, {x:70, y:60},
    {x:30, y:70}, {x:40, y:70}, {x:50, y:70}, {x:60, y:70}, {x:70, y:70},
];

// 方块大小
var block_size = 9.5; 

// 测试区域长宽（有可能做针对屏幕的修改吗？（或许并不需要））
var display_width = "800px"; 
var display_height = "800px"; 

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
    display_height : display_height,
    display_width : display_width,
    sequence: [3, 1, 2, 4, 5],
    mode: 'display'
}

let response = {
    type: jsPsychCorsiBlocks,
    blocks: test_block_arrangement,
    block_size : block_size,
    display_height : display_height,
    display_width : display_width,
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

