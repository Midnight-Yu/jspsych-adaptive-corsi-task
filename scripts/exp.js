/* 全局参数初始化 */

// 方块大小 //这个数字一般不做变动？
var block_size = 9.5;

// 外部储存一个用来传sequence的全局变量（这做法是不是不太对啊（
var local_sequence = [];

// 方块布局
var block_arrangement_5 = [
    { x: 30, y: 30 }, { x: 40, y: 30 }, { x: 50, y: 30 }, { x: 60, y: 30 }, { x: 70, y: 30 },
    { x: 30, y: 40 }, { x: 40, y: 40 }, { x: 50, y: 40 }, { x: 60, y: 40 }, { x: 70, y: 40 },
    { x: 30, y: 50 }, { x: 40, y: 50 }, { x: 50, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 50 },
    { x: 30, y: 60 }, { x: 40, y: 60 }, { x: 50, y: 60 }, { x: 60, y: 60 }, { x: 70, y: 60 },
    { x: 30, y: 70 }, { x: 40, y: 70 }, { x: 50, y: 70 }, { x: 60, y: 70 }, { x: 70, y: 70 },
];

var block_arrangement_6 = [
    { x: 25, y: 25 }, { x: 35, y: 25 }, { x: 45, y: 25 }, { x: 55, y: 25 }, { x: 65, y: 25 }, { x: 75, y: 25 },
    { x: 25, y: 35 }, { x: 35, y: 35 }, { x: 45, y: 35 }, { x: 55, y: 35 }, { x: 65, y: 35 }, { x: 75, y: 35 },
    { x: 25, y: 45 }, { x: 35, y: 45 }, { x: 45, y: 45 }, { x: 55, y: 45 }, { x: 65, y: 45 }, { x: 75, y: 45 },
    { x: 25, y: 55 }, { x: 35, y: 55 }, { x: 45, y: 55 }, { x: 55, y: 55 }, { x: 65, y: 55 }, { x: 75, y: 55 },
    { x: 25, y: 65 }, { x: 35, y: 65 }, { x: 45, y: 65 }, { x: 55, y: 65 }, { x: 65, y: 65 }, { x: 75, y: 65 },
    { x: 25, y: 75 }, { x: 35, y: 75 }, { x: 45, y: 75 }, { x: 55, y: 75 }, { x: 65, y: 75 }, { x: 75, y: 75 },
];

var block_arrangement_7 = [
    { x: 20, y: 20 }, { x: 30, y: 20 }, { x: 40, y: 20 }, { x: 50, y: 20 }, { x: 60, y: 20 }, { x: 70, y: 20 }, { x: 80, y: 20 },
    { x: 20, y: 30 }, { x: 30, y: 30 }, { x: 40, y: 30 }, { x: 50, y: 30 }, { x: 60, y: 30 }, { x: 70, y: 30 }, { x: 80, y: 30 },
    { x: 20, y: 40 }, { x: 30, y: 40 }, { x: 40, y: 40 }, { x: 50, y: 40 }, { x: 60, y: 40 }, { x: 70, y: 40 }, { x: 80, y: 40 },
    { x: 20, y: 50 }, { x: 30, y: 50 }, { x: 40, y: 50 }, { x: 50, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 50 }, { x: 80, y: 50 },
    { x: 20, y: 60 }, { x: 30, y: 60 }, { x: 40, y: 60 }, { x: 50, y: 60 }, { x: 60, y: 60 }, { x: 70, y: 60 }, { x: 80, y: 60 },
    { x: 20, y: 70 }, { x: 30, y: 70 }, { x: 40, y: 70 }, { x: 50, y: 70 }, { x: 60, y: 70 }, { x: 70, y: 70 }, { x: 80, y: 70 },
    { x: 20, y: 80 }, { x: 30, y: 80 }, { x: 40, y: 80 }, { x: 50, y: 80 }, { x: 60, y: 80 }, { x: 70, y: 80 }, { x: 80, y: 80 },
];

// 生成序列数字的函数
function generateSequence(index_max) {
    var array = [];
    for (var i = 0; i < index_max; i++) {
        array.push(i);
    }
    return array
};

// 方块ID列表，用在随机化函数里面
var block_id_list_5 = generateSequence(25);
var block_id_list_6 = generateSequence(36);
var block_id_list_7 = generateSequence(49);

// console.log(block_id_list_5);
// console.log(block_id_list_6);
// console.log(block_id_list_7);

// 测试区域长宽（有可能做针对屏幕的修改吗？（或许并不需要））
var display_width = "800px";
var display_height = "800px";

// 随机抽取算法，用来在索引列表中抽取数个方块作为本轮刺激
function getRandomElements(array, x) {
    const newArray = array
    const shuffledArray = newArray.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, x);
};

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
            blocks: block_arrangement_7,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
                let randomized_array = getRandomElements(block_id_list_7, 3);
                local_sequence = [...randomized_array];
                return randomized_array;
            },
            mode: 'display'
        },
        {
            type: jsPsychCorsiBlocks,
            blocks: block_arrangement_7,
            block_size: block_size,
            display_height: display_height,
            display_width: display_width,
            sequence: function () {
             // original_list = example_timeline.timeline[0].sequence; //写成这样有问题，获取到的是上面的函数了，不是数值，这里要传参了//需要获取timeline里上一个trial的参数
                let original_list = [...local_sequence];
                let reversed_list = original_list.reverse();
                return reversed_list;
            }, 
            mode: 'input'
        }
    ],
    sample: {
        type: 'fixed-repetitions',
        size: 3
    }
};

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

