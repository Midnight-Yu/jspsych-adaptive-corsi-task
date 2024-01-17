/* 全局参数初始化 */
// 方块布局
var test_block_arrangement = [
    { x: 30, y: 30 }, { x: 40, y: 30 }, { x: 50, y: 30 }, { x: 60, y: 30 }, { x: 70, y: 30 },
    { x: 30, y: 40 }, { x: 40, y: 40 }, { x: 50, y: 40 }, { x: 60, y: 40 }, { x: 70, y: 40 },
    { x: 30, y: 50 }, { x: 40, y: 50 }, { x: 50, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 50 },
    { x: 30, y: 60 }, { x: 40, y: 60 }, { x: 50, y: 60 }, { x: 60, y: 60 }, { x: 70, y: 60 },
    { x: 30, y: 70 }, { x: 40, y: 70 }, { x: 50, y: 70 }, { x: 60, y: 70 }, { x: 70, y: 70 },
];

// 方块ID列表，用在随机化函数里面
var block_id_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

// 方块大小
var block_size = 9.5;

// 测试区域长宽（有可能做针对屏幕的修改吗？（或许并不需要））
var display_width = "800px";
var display_height = "800px";

// 测试用，外部储存一个用来传sequence的全局变量（万一成了呢）（这做法不太对啊）
local_sequence = [];

// 随机抽取算法
function getRandomElements(array, x) {
    const newArray = array
    const shuffledArray = newArray.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, x);
}

/* 初始化jsPsych，注意添加的实验强制退出 */
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
});

// 注册一个listener，用于实验强制退出
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
};

let example_timeline = {
    timeline: [
        {
            type: jsPsychCorsiBlocks,
            blocks: test_block_arrangement,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                randomized_array = getRandomElements(block_id_list, 3);
                local_sequence = randomized_array;
                return randomized_array;
            },
            mode: 'display'
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: test_block_arrangement,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
             // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                original_list = local_sequence;
                reversed_list = original_list.reverse();
                return reversed_list;
            }, 
            mode: 'input'
        }
    ],
    sample: {
        type: 'fixed-repetitions',
        size: 3
    }
}

let ending = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class='experiment-instruction'><p>实验已结束</p></div>
    `,
    post_trial_gap: 500
};

/* jsPsych 运行*/
jsPsych.run([
    instruction, example_timeline, ending
]);

