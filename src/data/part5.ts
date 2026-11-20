import type { Part } from '../types/course';

/**
 * 第五篇：积分学
 * 依据《普林斯顿微积分读本》（The Calculus Lifesaver）第 15-20、29 章
 * 与 OpenStax Precalculus 2e 相关内容编写。
 * 主线：原函数 → 定积分 → 计算技巧 → 实际应用。
 */
export const part5: Part = {
  id: 'part5',
  number: 5,
  title: '积分学',
  subtitle: '把无限切成有限，把瞬间累成总量',
  source: 'The Calculus Lifesaver（普林斯顿微积分读本）与 OpenStax Precalculus 2e',
  intro:
    '前几篇我们一直在做一件事：把整体切成无限小的碎片，看它每一瞬间的变化率——那是导数。这一篇掉过头来：已知每一瞬间的变化率，怎么把它重新累积成整体的变化？这就是积分。它听起来抽象，其实你每天都在用：算路程、算面积、算总水量、算平均值。学完这一篇，你会拿到一把「化整为零再聚零为整」的万能钥匙。',
  goal: '理解原函数与定积分，掌握微积分基本定理与换元、分部、三角、部分分式等积分技巧，并能用积分解决面积、体积、路程与平均值等实际问题。',
  chapters: [
    /* ============================ 第一章 积分的基础 ============================ */
    {
      id: 'p5c1',
      number: 1,
      title: '积分的基础',
      intro:
        '这一章从最朴素的问题出发：已知导数，能不能把它「倒推」回原来的函数？我们把倒推的结果叫原函数，把一整族原函数叫不定积分。先把符号、公式和基本性质打牢，后面三章的所有技巧都建立在这些地基上。',
      outcomes: [
        '理解原函数与不定积分，知道积分常数 C 为什么不能丢',
        '会使用基本积分公式求常见函数的不定积分',
        '理解积分与导数互为逆运算',
        '掌握不定积分的线性性质并能逐项积分',
      ],
      topics: [
        {
          id: 'p5c1t1',
          title: '原函数与不定积分',
          objective: '理解原函数与不定积分的含义，能解释积分常数 C 的来源',
          minutes: 16,
          blocks: {
            background: [
              {
                title: '从「倒推」说起',
                text: '前面学求导：给你位移函数 $s(t)$，求导得到速度 $v(t)$。现在把问题反过来：已知速度 $v(t)$，想找回位移 $s(t)$。这种「已知导数、反求原函数」的需求，在物理、工程里到处都是——积分就是为回答它而生的。',
              },
            ],
            plain: [
              {
                text: '把求导想成把一台机器拆成零件、看清每个瞬间怎么动；积分就是把零件重新装回机器。有个关键点：拆开的方式唯一，装回去却可能差一个「起始位置」。比如知道速度是 $2x$，原函数可以是 $x^2$、$x^2+1$、$x^2-100$——它们求导都得到 $2x$，彼此只差一个常数。所以积分的答案是一整族函数，末尾要写上 $+C$。',
              },
            ],
            definition: [
              {
                title: '原函数与不定积分',
                text: '若函数 $F$ 满足 $F\'(x)=f(x)$，就称 $F$ 是 $f$ 的一个**原函数**（也叫反导数）。$f$ 的全体原函数称为 $f$ 的**不定积分**，记作 $$\\int f(x)\\,dx=F(x)+C,$$ 其中 $C$ 是任意常数，叫**积分常数**。',
              },
            ],
            symbols: [
              {
                title: '把符号一个个拆开看',
                text: '$\\int$ 是一个拉长的字母 S，代表 sum（求和），提示积分本质上是「把许多小量加起来」。$f(x)$ 叫**被积函数**。$dx$ 表示积分变量是 $x$（$x$ 是「哑变量」，换成 $t$、$u$ 都不影响结果）。$C$ 是任意常数，代表所有原函数彼此相差的那一位。',
              },
            ],
            keyFormulas: [
              { latex: '\\int f(x)\\,dx=F(x)+C\\quad\\Longleftrightarrow\\quad F\'(x)=f(x)', meaning: '不定积分与原函数：一边是积分，一边是求导检查', note: '必须写 + C，否则只得到一个原函数', display: 'block' },
              { latex: '\\frac{d}{dx}\\left[F(x)+C\\right]=f(x)', meaning: '对原函数求导，常数 C 消失，回到被积函数' },
            ],
            derivation: {
              intro: '为什么所有原函数只差一个常数？',
              steps: [
                { action: '设 $F$ 和 $G$ 都是 $f$ 的原函数', latex: '$F\'(x)=f(x),\\quad G\'(x)=f(x)$', why: '这是原函数的定义。' },
                { action: '考虑两者的差', latex: '$[F(x)-G(x)]\'=F\'(x)-G\'(x)=f(x)-f(x)=0$', why: '导数之差为零。' },
                { action: '导数为零的函数必是常数', latex: '$F(x)-G(x)=C$', why: '前面章节已学：导数为零意味着函数是一条水平线，即常数。' },
                { action: '得出结论', latex: '$F(x)=G(x)+C$', why: '所以找到一个原函数，加上任意常数就得到全部原函数。' },
              ],
              conclusion: '这正是不定积分末尾那个 $+C$ 的全部道理。',
            },
            examplesBasic: [
              {
                title: '求一个不定积分并验算',
                level: 'basic',
                asking: '求 $\\int x^2\\,dx$，并验证结果。',
                given: ['被积函数 $f(x)=x^2$'],
                method: ['倒用幂函数求导公式', '对结果求导验算'],
                steps: [
                  { action: '想起谁的导数是 $x^2$', latex: '$\\left(\\frac{x^3}{3}\\right)\'=\\frac{3x^2}{3}=x^2$', why: '幂函数求导：指数降下来作系数，指数减 1；反过来积分就是指数加 1 再除以新指数。' },
                  { action: '写出全体原函数', latex: '$\\int x^2\\,dx=\\frac{x^3}{3}+C$', why: '加上任意常数 $C$ 才表示所有原函数。' },
                  { action: '验算：对答案求导', latex: '$\\frac{d}{dx}\\left(\\frac{x^3}{3}+C\\right)=x^2+0=x^2$', why: '求导回到被积函数，说明积分正确。' },
                ],
                result: '$\\int x^2\\,dx=\\dfrac{x^3}{3}+C$。',
                check: '对结果求导得 $x^2$，与被积函数一致 ✓。',
                pitfall: '漏写 $+C$ 是最常见的扣分点。',
              },
            ],
            examplesAdvanced: [
              {
                title: '带初始条件的特解',
                level: 'advanced',
                asking: '已知 $f\'(x)=2x$ 且 $f(0)=3$，求 $f(x)$。',
                given: ['$f\'(x)=2x$', '$f(0)=3$（一个具体点的函数值）'],
                method: ['先求不定积分得到通解', '代入初始条件定出 $C$'],
                steps: [
                  { action: '求通解', latex: '$f(x)=\\int 2x\\,dx=x^2+C$', why: '因为 $(x^2)\'=2x$。' },
                  { action: '代入初始条件', latex: '$f(0)=0^2+C=3$', why: '把 $x=0$ 代入通解，让它等于已知的 3。' },
                  { action: '解出常数', latex: '$C=3$', why: '由此定出这一条特定的曲线。' },
                  { action: '写出特解', latex: '$f(x)=x^2+3$', why: '不再带 $C$，因为初始条件把常数锁死了。' },
                ],
                result: '$f(x)=x^2+3$。',
                check: '$f\'(x)=2x$ ✓，$f(0)=3$ ✓。',
                pitfall: '「不定积分」带 $C$，「初值问题」用条件定出 $C$ 后不带 $C$，别混。',
              },
            ],
            mistakes: [
              { title: '丢掉积分常数', text: '$\\int f(x)\\,dx$ 的答案是一族函数，末尾的 $+C$ 不能省。只在「定积分」和「带初始条件求特解」两种情况下才没有 $+C$。' },
              { title: '把 dx 当乘数', text: '$dx$ 只是告诉你「对谁积分」，不能像普通因子那样约掉或忽略。' },
            ],
            summary: [
              { text: '原函数是「导数的逆」，不定积分 $\\int f(x)\\,dx=F(x)+C$ 表示一整族原函数。$C$ 来自「导数相同的函数只差常数」。求导能验算积分：对答案求导回到被积函数就对了。' },
            ],
          },
        },
        {
          id: 'p5c1t2',
          title: '基本积分公式',
          objective: '熟记常见函数的基本积分公式，能直接求简单的不定积分',
          minutes: 20,
          blocks: {
            background: [
              {
                title: '为什么要背公式表',
                text: '如果每道积分都从头想「谁的导数是它」，效率太低。就像乘法口诀，把常见导数公式倒过来记成积分公式，遇到题就能直接套用。',
              },
            ],
            plain: [
              {
                text: '积分公式表其实就是**倒着读的导数表**。导数是「指数减 1」，积分就「指数加 1」；导数是「乘上系数」，积分就「除以系数」。唯一要特别记的是 $1/x$：它的积分是对数 $\\ln|x|$，因为幂函数公式在指数等于 $-1$ 时会「除以 0」，必须单独处理。',
              },
            ],
            definition: [
              {
                title: '基本积分公式（节选）',
                text: '下面这些公式都可由对应的求导公式倒推得到，其中 $C$ 为任意常数，$a>0$ 且 $a\\neq1$。',
              },
            ],
            keyFormulas: [
              { latex: '\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C\\quad(n\\neq-1)', meaning: '幂函数积分：指数加 1，再除以新指数', note: '$n=-1$ 是例外，不能套用', display: 'block' },
              { latex: '\\int \\frac{1}{x}\\,dx=\\ln|x|+C', meaning: '1/x 的积分是对数，绝对值不能省', display: 'block' },
              { latex: '\\int e^x\\,dx=e^x+C', meaning: 'e 的 x 次方的积分还是它自己' },
              { latex: '\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C', meaning: '一般指数函数积分，要除以 $\\ln a$' },
              { latex: '\\int \\sin x\\,dx=-\\cos x+C', meaning: '正弦的积分是负余弦', note: '负号容易漏' },
              { latex: '\\int \\cos x\\,dx=\\sin x+C', meaning: '余弦的积分是正弦' },
              { latex: '\\int \\sec^2 x\\,dx=\\tan x+C', meaning: '正割平方的积分是正切' },
              { latex: '\\int \\frac{1}{1+x^2}\\,dx=\\arctan x+C', meaning: '产生反正切' },
              { latex: '\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx=\\arcsin x+C', meaning: '产生反正弦' },
              { latex: '\\int \\frac{1}{ax+b}\\,dx=\\frac{1}{a}\\ln|ax+b|+C', meaning: '内是一次式时，积分后要除以系数 $a$' },
            ],
            examplesBasic: [
              {
                title: '负指数与分数指数的积分',
                level: 'basic',
                asking: '求 $\\int x^3\\,dx$ 与 $\\int \\sqrt{x}\\,dx$。',
                given: ['$x^3$', '$\\sqrt{x}$'],
                method: ['幂函数积分公式', '根式先写成指数形式'],
                steps: [
                  { action: '算 $\\int x^3\\,dx$', latex: '$\\int x^3\\,dx=\\frac{x^{3+1}}{3+1}+C=\\frac{x^4}{4}+C$', why: '指数 3 加 1 得 4，再除以 4。' },
                  { action: '把根式写成指数', latex: '$\\sqrt{x}=x^{1/2}$', why: '幂函数公式要求写成 $x^n$ 的形式。' },
                  { action: '套用公式', latex: '$\\int x^{1/2}\\,dx=\\frac{x^{3/2}}{3/2}+C=\\frac{2}{3}x^{3/2}+C$', why: '除以 $\\frac32$ 等于乘 $\\frac23$。' },
                ],
                result: '$\\int x^3\\,dx=\\dfrac{x^4}{4}+C$，$\\int \\sqrt{x}\\,dx=\\dfrac{2}{3}x^{3/2}+C$。',
                check: '对两个结果求导分别得 $x^3$ 和 $x^{1/2}$ ✓。',
                pitfall: '$\\frac{x^{3/2}}{3/2}$ 要化简成 $\\frac23x^{3/2}$，别把除以分数算成乘以分数。',
              },
            ],
            examplesAdvanced: [
              {
                title: '识别公式的变形',
                level: 'advanced',
                asking: '求 $\\int \\frac{1}{x^2}\\,dx$。',
                given: ['$\\int \\frac{1}{x^2}\\,dx$'],
                method: ['先改写成负指数', '注意这不是 $n=-1$ 的情形'],
                steps: [
                  { action: '改写成分数指数', latex: '$\\frac{1}{x^2}=x^{-2}$', why: '把分式改写成幂的形式才能用幂函数公式。' },
                  { action: '套用幂函数公式', latex: '$\\int x^{-2}\\,dx=\\frac{x^{-1}}{-1}+C=-x^{-1}+C$', why: '这里 $n=-2$，加 1 得 $-1$，除以 $-1$。' },
                  { action: '写回分式', latex: '$=-\\frac{1}{x}+C$', why: '结果写成更熟悉的分式形式。' },
                ],
                result: '$\\int \\dfrac{1}{x^2}\\,dx=-\\dfrac{1}{x}+C$。',
                check: '求导：$\\left(-\\frac1x\\right)\'=\\frac{1}{x^2}$ ✓。',
                pitfall: '只有 $\\frac1x$（指数恰为 $-1$）才积成对数；$\\frac1{x^2}$ 用幂函数公式。',
              },
            ],
            mistakes: [
              { title: '$n=-1$ 的特殊性', text: '幂函数公式 $\\int x^n dx=\\frac{x^{n+1}}{n+1}$ 在 $n=-1$ 时会除以 0，失效。此时答案是 $\\ln|x|+C$。' },
              { title: '对数要带绝对值', text: '$\\int \\frac1x dx=\\ln|x|+C$，因为 $x<0$ 时 $\\ln x$ 没定义，而 $\\ln|x|$ 两边都能用。' },
            ],
            summary: [
              { text: '基本积分公式是倒过来读的导数表。核心是幂函数公式（$n\\neq-1$）和 $1/x\\to\\ln|x|$ 的特例；指数、三角、反三角各有对应公式。记住「积分后除以内部系数」，并用求导验算。' },
            ],
          },
        },
        {
          id: 'p5c1t3',
          title: '积分与导数的互逆关系',
          objective: '理解积分与导数互为逆运算，能用线性性质逐项求不定积分',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '加减互为逆运算，乘除互为逆运算。积分和导数也是一对逆运算——只是顺序不同，细节上差一个常数。把这一点吃透，很多看起来绕的题会瞬间变简单。',
              },
            ],
            plain: [
              {
                text: '先积分再求导，你会「回到原点」：$\\frac{d}{dx}\\left(\\int f(x)dx\\right)=f(x)$。先求导再积分，也基本回到原点，只是多了个常数：$\\int f\'(x)dx=f(x)+C$。另外，积分和加法、数乘很合得来：和的积分等于积分的和，常数能提到积分号外——但合并后只写一个 $C$。',
              },
            ],
            definition: [
              {
                title: '互逆关系与线性性质',
                text: '设 $f,g$ 可积，$k$ 为常数，则：① $\\dfrac{d}{dx}\\left[\\int f(x)\\,dx\\right]=f(x)$；② $\\int f\'(x)\\,dx=f(x)+C$；③ $\\int [f(x)\\pm g(x)]dx=\\int f(x)dx\\pm\\int g(x)dx$；④ $\\int k f(x)dx=k\\int f(x)dx$。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{d}{dx}\\left[\\int f(x)\\,dx\\right]=f(x)', meaning: '先积后导：直接回到被积函数' },
              { latex: '\\int f\'(x)\\,dx=f(x)+C', meaning: '先导后积：回到原函数，多一个常数', display: 'block' },
              { latex: '\\int [f\\pm g]\\,dx=\\int f\\,dx\\pm\\int g\\,dx', meaning: '和差的积分等于积分的和差' },
              { latex: '\\int k f\\,dx=k\\int f\\,dx', meaning: '常数因子可提到积分号外', note: '提取的必须是常数，含 x 的因子不行' },
            ],
            derivation: {
              intro: '线性性质为什么成立？它来自导数的线性性：',
              steps: [
                { action: '设 $F\'=f$，$G\'=g$', latex: '$[F\\pm G]\'=f\\pm g$', why: '导数的和差等于导数的和差。' },
                { action: '两边积分', latex: '$\\int [f\\pm g]\\,dx=F\\pm G+C$', why: '按原函数定义写出积分。' },
                { action: '拆成两个积分', latex: '$=\\int f\\,dx\\pm\\int g\\,dx$', why: '右边正是两个积分相加减。' },
              ],
            },
            examplesBasic: [
              {
                title: '逐项积分',
                level: 'basic',
                asking: '求 $\\int (x^2+3x)\\,dx$。',
                given: ['被积函数是两项之和 $x^2+3x$'],
                method: ['和差的积分等于积分的和', '常数提到积分号外', '最后只写一个 $C$'],
                steps: [
                  { action: '拆成两个积分', latex: '$\\int (x^2+3x)\\,dx=\\int x^2\\,dx+\\int 3x\\,dx$', why: '利用加法性质。' },
                  { action: '提出常数 3', latex: '$=\\int x^2\\,dx+3\\int x\\,dx$', why: '3 是常数，可以提到积分号外。' },
                  { action: '分别积分', latex: '$=\\frac{x^3}{3}+3\\cdot\\frac{x^2}{2}+C$', why: '逐项套用幂函数公式。' },
                  { action: '化简', latex: '$=\\frac{x^3}{3}+\\frac{3x^2}{2}+C$', why: '两项的常数合并为一个 $C$。' },
                ],
                result: '$\\dfrac{x^3}{3}+\\dfrac{3x^2}{2}+C$。',
                check: '求导得 $x^2+3x$ ✓。',
                pitfall: '不要写成 $+\\ C_1+C_2$，多个常数合并成一个 $C$ 即可。',
              },
            ],
            examplesAdvanced: [
              {
                title: '互逆关系的直接应用',
                level: 'advanced',
                asking: '求 $\\frac{d}{dx}\\left[\\int (t^3+1)\\,dt\\right]$ 与 $\\int \\frac{d}{dx}(\\ln x)\\,dx$。',
                given: ['第一个是「先积后导」', '第二个是「先导后积」'],
                method: ['微积分基本关系的两条公式'],
                steps: [
                  { action: '先积后导', latex: '$\\frac{d}{dx}\\left[\\int (t^3+1)\\,dt\\right]=x^3+1$', why: '按公式①，求导直接把积分「消掉」，把哑变量 $t$ 换成 $x$。' },
                  { action: '先求导', latex: '$\\frac{d}{dx}(\\ln x)=\\frac{1}{x}$', why: '先算出导数。' },
                  { action: '再积分', latex: '$\\int \\frac{1}{x}\\,dx=\\ln|x|+C$', why: '按公式②，回到原函数，多一个常数。' },
                ],
                result: '第一题 $=x^3+1$；第二题 $=\\ln|x|+C$。',
                check: '两题分别体现「消去积分」和「多出常数」，符合互逆关系 ✓。',
              },
            ],
            mistakes: [
              { title: '常数因子要认清', text: '$\\int 3x\\,dx$ 能提 3；但 $\\int x\\cdot x\\,dx$ 里的第一个 $x$ 不是常数，不能提出去。' },
              { title: '两个方向差一个常数', text: '「先积后导」没有 $+C$；「先导后积」有 $+C$。记不清时就把定义写一遍。' },
            ],
            summary: [
              { text: '积分与导数互为逆运算：$\\frac{d}{dx}\\int f=f$，$\\int f\'=f+C$。不定积分满足线性性质——和差可拆、常数可提，但最后只保留一个积分常数 $C$。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第二章 定积分 ============================ */
    {
      id: 'p5c2',
      number: 2,
      title: '定积分',
      intro:
        '上一章的积分给出一个「函数族」，这一章的定积分给出一个「数」——它代表曲线下的有向面积，或一段时间内的累计变化。我们从「切碎再求和」的黎曼和讲起，最后用微积分基本定理把定积分的计算变得极其简单。',
      outcomes: [
        '理解黎曼和「分割—近似—求和—取极限」的思想',
        '掌握定积分的定义、符号与有向面积的含义',
        '会使用定积分的基本性质简化计算',
        '能用微积分基本定理计算定积分',
      ],
      topics: [
        {
          id: 'p5c2t1',
          title: '从面积到黎曼和',
          objective: '理解用窄矩形逼近曲线下面积的过程，会写黎曼和',
          minutes: 18,
          blocks: {
            background: [
              {
                title: '曲边图形的面积难题',
                text: '长方形、三角形的面积公式我们早就会，可曲线围成的面积怎么算？《普林斯顿微积分读本》用一个开车的例子引入：已知每一时刻的速度，求总路程——把时间切成小段，每段近似匀速，路程相加，段越细越准。',
              },
            ],
            plain: [
              {
                text: '想象切一根弯曲的黄瓜：切成很多薄片，每片都近似一个小长方体，把所有薄片体积加起来就逼近总体积。对曲线下的面积也一样：把它切成许多窄竖条，每条当成一个小矩形（高取曲线上某点的高度，宽是很小的 $\\Delta x$），加起来就是面积的近似值。切得越细，近似越好。',
              },
            ],
            definition: [
              {
                title: '黎曼和',
                text: '把区间 $[a,b]$ 划分成 $n$ 个小区间，第 $j$ 个小区间长度记为 $\\Delta x_j$，在其中任选一点 $c_j$。则和式 $$\\sum_{j=1}^{n} f(c_j)\\,\\Delta x_j$$ 称为 $f$ 在该划分上的一个**黎曼和**，它是曲线下有向面积的近似值。',
              },
            ],
            symbols: [
              {
                title: '符号逐个看',
                text: '$\\sum$ 是大写希腊字母 sigma，表示「把各项加起来」。$\\Delta x_j$ 是第 $j$ 个小竖条的宽度（$\\Delta$ 表示「微小的变化量」）。$c_j$ 是你在这条里挑的样本点，取左端、右端、中点都行。所有小区间中最大的宽度叫**网格**（mesh），让它趋于 0 能保证每条都足够窄。',
              },
            ],
            keyFormulas: [
              { latex: '\\text{面积}\\approx\\sum_{j=1}^{n} f(c_j)\\,\\Delta x_j', meaning: '黎曼和：所有小矩形面积之和', note: '等距划分时 $\\Delta x=\\frac{b-a}{n}$', display: 'block' },
              { latex: '\\sum_{j=1}^{n} j^2=\\frac{n(n+1)(2n+1)}{6}', meaning: '求 $\\int_0^2 x^2dx$ 时用到的平方和公式' },
            ],
            derivation: {
              intro: '为什么要让「最大区间」趋于 0，而不只是让 $n\\to\\infty$？',
              steps: [
                { action: '设想划分很不均匀', latex: '某一个小竖条特别宽', why: '即使绝大多数条很窄，只要有一条很宽，它带来的误差就会主导结果。' },
                { action: '控制最大宽度', latex: '\\text{mesh}=\\max_j \\Delta x_j\\to 0', why: '让最宽的那条也趋于 0，才能保证每一条的近似都好。' },
                { action: '上和与下和', latex: 'L\\leq \\text{真实面积}\\leq U', why: '每条取最小值得到「下和」$L$，取最大值得到「上和」$U$。' },
                { action: '夹逼', latex: '\\text{当 mesh}\\to0,\\ L,U\\to\\text{同一个极限}', why: '由三明治定理，无论样本点怎么选，黎曼和都趋于同一个数。' },
              ],
              conclusion: '这个共同的极限，就是下一节的定积分。',
            },
            examplesBasic: [
              {
                title: '用矩形估算面积',
                level: 'basic',
                asking: '用 4 个等宽小矩形（取右端点）估算 $\\int_0^2 x^2\\,dx$ 对应的面积。',
                given: ['区间 $[0,2]$，分成 4 等份', '取每个小区间的右端点为样本点'],
                method: ['算出宽度与各矩形高度', '求黎曼和'],
                steps: [
                  { action: '算小矩形宽度', latex: '$\\Delta x=\\frac{2-0}{4}=0.5$', why: '总长度除以份数。' },
                  { action: '列出右端点', latex: '$c_1=0.5,\\ c_2=1,\\ c_3=1.5,\\ c_4=2$', why: '右端点分别是 $0.5,1,1.5,2$。' },
                  { action: '算各高度', latex: '$f(0.5)=0.25,\\ f(1)=1,\\ f(1.5)=2.25,\\ f(2)=4$', why: '把样本点代入 $f(x)=x^2$。' },
                  { action: '求和', latex: '$0.5\\times(0.25+1+2.25+4)=0.5\\times7.5=3.75$', why: '每个矩形面积是「高×宽」，再全部加起来。' },
                ],
                result: '估算面积约为 $3.75$。',
                check: '精确值是 $\\frac83\\approx2.67$，取右端点是「上和」，估算值偏大，合理 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '用定义严格计算',
                level: 'advanced',
                asking: '用黎曼和的定义求 $\\int_0^2 x^2\\,dx$。',
                given: ['$f(x)=x^2$，区间 $[0,2]$'],
                method: ['等距划分取右端点', '用平方和公式', '令 $n\\to\\infty$ 取极限'],
                steps: [
                  { action: '等距划分', latex: '$\\Delta x=\\frac{2}{n},\\quad c_j=\\frac{2j}{n}\\ (j=1,\\dots,n)$', why: '每小段宽度 $\\frac2n$，第 $j$ 个右端点横坐标是 $\\frac{2j}{n}$。' },
                  { action: '写黎曼和', latex: '$\\sum_{j=1}^{n}\\left(\\frac{2j}{n}\\right)^2\\cdot\\frac{2}{n}=\\frac{8}{n^3}\\sum_{j=1}^{n}j^2$', why: '代入 $f(c_j)=(\\frac{2j}{n})^2$，把与 $j$ 无关的因子提出。' },
                  { action: '代入平方和公式', latex: '$=\\frac{8}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6}$', why: '用 $\\sum j^2=\\frac{n(n+1)(2n+1)}{6}$。' },
                  { action: '取极限', latex: '$\\lim_{n\\to\\infty}\\frac{8(2n^3+3n^2+n)}{6n^3}=\\frac{8}{3}$', why: '分子分母同除以 $n^3$，$n\\to\\infty$ 时低次项消失。' },
                ],
                result: '$\\int_0^2 x^2\\,dx=\\dfrac{8}{3}$。',
                check: '用微积分基本定理可一步算出 $\\frac83$，结果一致 ✓。',
                pitfall: '全过程繁琐，正是它促使我们寻找更聪明的基本定理。',
              },
            ],
            application: [
              {
                title: '计算机也在用这个思想',
                text: '当积分没有解析公式时，计算机把区间切成成千上万小块，用矩形法或梯形法（黎曼和的改进）做数值积分。你用的计算器、仿真软件算积分，底层就是这套「切碎求和」。',
              },
            ],
            figure: {
              kind: 'integral',
              initialFn: 'x^2',
              caption: '观察曲线 $y=x^2$ 下的窄条：划分越细（窄条越多），矩形总面积越接近真实面积。体会「分割—近似—求和—取极限」。',
            },
            summary: [
              { text: '黎曼和四步走：分割、近似（小矩形）、求和、取极限（网格趋于 0）。上和与下和把真实面积夹在中间，由夹逼定理保证极限唯一。它是定积分严格定义的基石。' },
            ],
          },
        },
        {
          id: 'p5c2t2',
          title: '定积分的定义与有向面积',
          objective: '理解定积分是黎曼和的极限，会读写符号并解释有向面积',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '上一节的黎曼和极限如果存在，就给它一个名字——定积分。它代表一个数（面积），跟上一章的「函数族」（不定积分）截然不同。先把符号认全，才不会在后面混淆。',
              },
            ],
            plain: [
              {
                text: '定积分 $\\int_a^b f(x)dx$ 就是「把 $a$ 到 $b$ 之间所有小竖条加起来」的记号。有个关键约定：曲线在 $x$ 轴**上方**的面积算正，在**下方**的面积算负。这叫**有向面积**，像记账——收入记正、支出记负。所以定积分可能是负数，甚至可能是 0。',
              },
            ],
            definition: [
              {
                title: '定积分的严格定义',
                text: '若黎曼和在网格（最大区间长度）趋于 0 时的极限存在，且此极限与划分方式、样本点的选取无关，则称 $f$ 在 $[a,b]$ 上**可积**，并定义 $$\\int_a^b f(x)\\,dx=\\lim_{\\text{mesh}\\to0}\\sum_{j=1}^{n} f(c_j)\\,\\Delta x_j.$$ 闭区间上的连续函数一定可积。',
              },
            ],
            symbols: [
              {
                title: '符号拆解与对比',
                text: '$a$ 叫积分下限，$b$ 叫积分上限，$f(x)$ 是被积函数，$dx$ 说明对 $x$ 积分（$x$ 同样是哑变量，写成 $\\int_a^b f(t)dt$ 完全一样）。**定积分是一个数**（有向面积），**不定积分是一族函数**，两者只是共用了 $\\int$ 这个符号。',
              },
            ],
            keyFormulas: [
              { latex: '\\int_a^b f(x)\\,dx=\\lim_{\\text{mesh}\\to0}\\sum_{j=1}^{n}f(c_j)\\,\\Delta x_j', meaning: '定积分是黎曼和的极限', display: 'block' },
              { latex: '\\text{位移}=\\int_a^b v(t)\\,dt,\\qquad \\text{路程}=\\int_a^b |v(t)|\\,dt', meaning: '速度积分得位移，速率积分得路程' },
              { latex: 'f\\ \\text{为奇函数}\\Rightarrow\\int_{-a}^{a} f(x)\\,dx=0', meaning: '奇函数在对称区间的积分等于 0', note: '正负面积对称抵消' },
              { latex: '\\int_a^b 1\\,dx=b-a', meaning: '常数 1 的积分就是区间长度' },
            ],
            examplesBasic: [
              {
                title: '用几何直接算',
                level: 'basic',
                asking: '计算 $\\int_0^2 x\\,dx$。',
                given: ['$f(x)=x$，区间 $[0,2]$'],
                method: ['画出 $y=x$，看出是直角三角形', '用三角形面积公式'],
                steps: [
                  { action: '识别图形', latex: '$y=x$、$x$ 轴、$x=0$、$x=2$ 围成三角形', why: '函数图像是一条过原点的直线。' },
                  { action: '确定底和高', latex: '底 $=2$，高 $=f(2)=2$', why: '区间长度是底，右端点的函数值是高。' },
                  { action: '算面积', latex: '$\\frac12\\times2\\times2=2$', why: '三角形面积公式 $\\frac12\\times$底$\\times$高。' },
                ],
                result: '$\\int_0^2 x\\,dx=2$。',
                check: '用微积分基本定理算得 $\\left[\\frac{x^2}{2}\\right]_0^2=2$ ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '对称性带来的捷径',
                level: 'advanced',
                asking: '计算 $\\int_{-\\pi}^{\\pi} \\sin x\\,dx$。',
                given: ['$\\sin x$ 是奇函数', '区间 $[-\\pi,\\pi]$ 关于原点对称'],
                method: ['有向面积的正负抵消', '奇函数对称区间性质'],
                steps: [
                  { action: '分析正负', latex: '$0$ 到 $\\pi$ 上 $\\sin x\\geq0$，$-\\pi$ 到 $0$ 上 $\\sin x\\leq0$', why: '正弦在正半轴为正、负半轴为负。' },
                  { action: '对称性', latex: '两侧面积大小相等、符号相反', why: '奇函数满足 $f(-x)=-f(x)$，图像关于原点对称。' },
                  { action: '得出结论', latex: '$\\int_{-\\pi}^{\\pi}\\sin x\\,dx=0$', why: '正负面积完全抵消。' },
                ],
                result: '$0$。',
                check: '用原函数验算：$[-\\cos x]_{-\\pi}^{\\pi}=1-1=0$ ✓。',
                pitfall: '题目问「实际面积」时要分段取绝对值，结果是 $4$，别和这里的有向面积混。',
              },
            ],
            figure: {
              kind: 'integral',
              initialFn: 'x^2',
              caption: '观察积分上下限 $a$、$b$ 与曲线下的有向面积：曲线在轴上方贡献正面积，在轴下方贡献负面积。',
            },
            mistakes: [
              { title: '定积分是一个数', text: '$\\int_a^b f(x)dx$ 算完是一个具体的数，不再含 $x$。写成「$+C$」就错了。' },
              { title: '忽略负面积', text: '求「面积」时要分段取绝对值；定积分本身是「有向面积」，可能为负。看清题目问的是哪个。' },
            ],
            summary: [
              { text: '定积分是黎曼和的极限，表示曲线下的有向面积，是一个数。符号中 $a$、$b$ 是上下限，$dx$ 指明积分变量。连续函数必可积；奇函数在对称区间上积分为 0。' },
            ],
          },
        },
        {
          id: 'p5c2t3',
          title: '定积分的基本性质',
          objective: '掌握定积分的线性、区间可加与估值性质，能简化计算',
          minutes: 15,
          blocks: {
            background: [
              {
                text: '定积分有一套和代数很像的运算规则。熟练掌握它们，遇到复杂积分就能「拆、提、换」，把难题化成几个熟悉的小块。',
              },
            ],
            plain: [
              {
                text: '把积分限倒过来，相当于「倒放影片」，位移变负，所以积分变号。上下限相同就是「没走」，积分为 0。把一段路拆成两段，总位移等于两段之和——这就是区间可加性。常数能提出、和差能拆开，跟不定积分一样。',
              },
            ],
            definition: [
              {
                title: '常用性质（设 $f,g$ 可积，$k$ 为常数）',
                text: '① $\\int_a^b f(x)dx=-\\int_b^a f(x)dx$（交换上下限变号）；② $\\int_a^a f(x)dx=0$；③ $\\int_a^b f(x)dx=\\int_a^c f(x)dx+\\int_c^b f(x)dx$（区间可加，点 $c$ 甚至可在区间外）；④ $\\int_a^b kf(x)dx=k\\int_a^b f(x)dx$；⑤ $\\int_a^b [f\\pm g]dx=\\int_a^b f dx\\pm\\int_a^b g dx$；⑥ 若在 $[a,b]$ 上 $m\\leq f(x)\\leq M$，则 $m(b-a)\\leq\\int_a^b f(x)dx\\leq M(b-a)$。',
              },
            ],
            keyFormulas: [
              { latex: '\\int_a^b f\\,dx=-\\int_b^a f\\,dx', meaning: '交换上下限，变号' },
              { latex: '\\int_a^b f\\,dx=\\int_a^c f\\,dx+\\int_c^b f\\,dx', meaning: '区间可加性，可分段计算', display: 'block' },
              { latex: '\\int_a^b kf\\,dx=k\\int_a^b f\\,dx', meaning: '常数可提出' },
              { latex: 'm(b-a)\\leq\\int_a^b f(x)\\,dx\\leq M(b-a)', meaning: '估值性质：$m,M$ 分别是最小最大值', note: '可在不计算积分的情况下估计范围' },
            ],
            examplesBasic: [
              {
                title: '交换上下限',
                level: 'basic',
                asking: '计算 $\\int_2^0 x\\,dx$。',
                given: ['$\\int_0^2 x\\,dx=2$ 已知'],
                method: ['交换上下限变号'],
                steps: [
                  { action: '交换上下限', latex: '$\\int_2^0 x\\,dx=-\\int_0^2 x\\,dx$', why: '下限比上限大时，先交换并加负号。' },
                  { action: '代入已知', latex: '$=-2$', why: '已知 $\\int_0^2 x\\,dx=2$。' },
                ],
                result: '$-2$。',
                check: '倒着积分得到负值，符合「倒放影片位移为负」的直觉 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '分段处理绝对值',
                level: 'advanced',
                asking: '计算 $\\int_{-1}^{2} |x|\\,dx$。',
                given: ['$|x|$ 在 $x=0$ 处改变表达式'],
                method: ['在 0 处分段', '$x<0$ 时 $|x|=-x$，$x\\geq0$ 时 $|x|=x$'],
                steps: [
                  { action: '按零点分段', latex: '$\\int_{-1}^{2}|x|\\,dx=\\int_{-1}^{0}|x|\\,dx+\\int_{0}^{2}|x|\\,dx$', why: '绝对值在 0 处变号，用区间可加性拆开。' },
                  { action: '去绝对值', latex: '$=\\int_{-1}^{0}(-x)\\,dx+\\int_{0}^{2}x\\,dx$', why: '负半轴 $|x|=-x$，正半轴 $|x|=x$。' },
                  { action: '分别用几何/公式算', latex: '$=\\frac12+\\frac{2^2}{2}=\\frac12+2$', why: '第一段是底 1 高 1 的三角形 $\\frac12$；第二段是底 2 高 2 的三角形 $2$。' },
                  { action: '相加', latex: '$=\\frac52$', why: '两部分面积相加。' },
                ],
                result: '$\\dfrac{5}{2}$。',
                check: '直接几何：左侧三角形 $\\frac12$ + 右侧三角形 $2$ = $2.5$ ✓。',
              },
            ],
            mistakes: [
              { title: '提出去的必须是常数', text: '$\\int_a^b x\\cdot 2\\,dx$ 能提 2，但 $\\int_a^b x\\cdot x\\,dx$ 不能提 $x$——含积分变量的因子不能提到积分号外。' },
              { title: '分段要找对零点', text: '处理绝对值时，分段点是让被积函数内部为 0 的位置，别凭感觉乱分。' },
            ],
            summary: [
              { text: '定积分性质：交换上下限变号、上下限相同为 0、区间可加、线性（常数可提、和差可拆）、估值 $m(b-a)\\leq\\int f\\leq M(b-a)$。它们是简化积分计算的基本工具。' },
            ],
          },
        },
        {
          id: 'p5c2t4',
          title: '微积分基本定理',
          objective: '理解两个基本定理，能用反导数快速计算定积分',
          minutes: 22,
          blocks: {
            background: [
              {
                title: '摆脱繁琐的黎曼和',
                text: '用黎曼和算 $\\int_0^2 x^2dx$ 要写满一页纸。有没有更快的办法？微积分基本定理把「积分」和「求导」这对逆运算联系起来，让定积分的计算变成「找原函数、代两端、相减」三步——这是整个微积分最核心的定理。',
              },
            ],
            plain: [
              {
                text: '第一基本定理说：把积分上限当成变量 $x$，对 $\\int_a^x f(t)dt$ 求导，结果就是 $f(x)$——像拉窗帘，拉动的速度等于窗帘右边沿的高度。第二基本定理说：想算 $\\int_a^b f(x)dx$，只要找到 $f$ 的任意一个原函数 $F$，算 $F(b)-F(a)$ 即可。',
              },
            ],
            definition: [
              {
                title: '两个基本定理',
                text: '**第一基本定理**：若 $f$ 连续，则 $F(x)=\\int_a^x f(t)\\,dt$ 满足 $F\'(x)=f(x)$。\n**第二基本定理（牛顿—莱布尼茨公式）**：若 $F\'=f$，则 $$\\int_a^b f(x)\\,dx=F(b)-F(a)=\\left[F(x)\\right]_a^b.$$',
              },
            ],
            symbols: [
              {
                title: '为什么用 t 做哑变量',
                text: '在 $\\int_a^x f(t)dt$ 里，上限是变量 $x$，所以被积函数里必须用另一个字母 $t$，否则写成 $\\int_a^x f(x)dx$ 会「自己与自己混淆」。$t$ 是哑变量，最后求导会把 $t$ 换成 $x$。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)', meaning: '第一基本定理：积分上限求导得被积函数', display: 'block' },
              { latex: '\\int_a^b f(x)\\,dx=F(b)-F(a)', meaning: '第二基本定理：原函数在两端取值之差', note: '计算定积分时可忽略常数 C（它会抵消）', display: 'block' },
            ],
            derivation: {
              intro: '第一基本定理的直观证明（小竖条）：',
              steps: [
                { action: '给上限一个微小增量', latex: '$F(x+h)-F(x)=\\int_x^{x+h} f(t)\\,dt$', why: '利用区间可加性，差出来的是 $[x,x+h]$ 上一小条面积。' },
                { action: '近似小条', latex: '$\\int_x^{x+h} f(t)\\,dt\\approx h\\,f(x)$', why: '$h$ 很小时，这一小条近似宽 $h$、高 $f(x)$ 的矩形。' },
                { action: '除以 h 取极限', latex: '$F\'(x)=\\lim_{h\\to0}\\frac{F(x+h)-F(x)}{h}=f(x)$', why: '这就是导数的定义。严格版用积分中值定理加夹逼完成。' },
              ],
              conclusion: '于是「积分的导数就是被积函数」。',
            },
            examplesBasic: [
              {
                title: '用第二基本定理算积分',
                level: 'basic',
                asking: '计算 $\\int_0^2 x^2\\,dx$。',
                given: ['$x^2$ 的原函数是 $\\frac{x^3}{3}$'],
                method: ['找原函数', '代入上下限求差'],
                steps: [
                  { action: '写出原函数', latex: '$F(x)=\\frac{x^3}{3}$', why: '因为 $F\'(x)=x^2$；定积分计算中取 $C=0$ 即可。' },
                  { action: '代入上下限', latex: '$\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{2^3}{3}-\\frac{0^3}{3}$', why: '第二基本定理：上限值减下限值。' },
                  { action: '化简', latex: '$=\\frac{8}{3}$', why: '得到与黎曼和一致的答案，但只用了三步。' },
                ],
                result: '$\\dfrac{8}{3}$。',
                check: '与用黎曼和算的结果相同 ✓。',
                pitfall: '代入时给整个原式加括号，避免丢负号。',
              },
            ],
            examplesAdvanced: [
              {
                title: '第一基本定理与链式法则',
                level: 'advanced',
                asking: '求 $\\frac{d}{dx}\\int_2^{x^2} e^{t}\\,dt$。',
                given: ['积分上限是 $x^2$（是 $x$ 的函数）'],
                method: ['第一基本定理', '上限为函数时要配链式法则'],
                steps: [
                  { action: '设中间变量', latex: '令 $u=x^2$，则 $y=\\int_2^{u} e^{t}\\,dt$', why: '上限不是单纯的 $x$，先用 $u$ 代替。' },
                  { action: '链式法则', latex: '$\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}$', why: '$y$ 通过 $u$ 依赖于 $x$。' },
                  { action: '分别求两部分', latex: '$\\frac{dy}{du}=e^{u}$（第一基本定理），\\quad \\frac{du}{dx}=2x$', why: '第一部分对上限求导直接得被积函数；第二部分是 $u=x^2$ 的导数。' },
                  { action: '合并并回代', latex: '$\\frac{dy}{dx}=e^{u}\\cdot2x=2x\\,e^{x^2}$', why: '用 $u=x^2$ 替换回去。' },
                ],
                result: '$2x\\,e^{x^2}$。',
                check: '若先算积分 $\\int_2^{x^2}e^t dt=e^{x^2}-e^2$，再求导得 $2xe^{x^2}$ ✓。',
                pitfall: '别忘乘上限的导数 $2x$；也别在求导的结果后面写 $+C$。',
              },
            ],
            application: [
              {
                title: '微积分的「大一统」',
                text: '基本定理把看似无关的两件事——求切线斜率（微分）和求曲线下面积（积分）——连成一体：它们是互逆运算。这一发现是微积分成为强大工具的关键，也是后面所有积分技巧的理论根基。',
              },
            ],
            ai: [
              {
                title: '与机器学习的联系',
                text: '训练神经网络时用的梯度，本质是导数；而累积损失、期望等概念要用积分。基本定理保证「先用积分累积、再求导数」和直接操作可以互相转化，是理解反向传播与概率期望关系的桥梁。',
              },
            ],
            summary: [
              { text: '第一基本定理：$\\frac{d}{dx}\\int_a^x f(t)dt=f(x)$（上限是函数时再乘上限的导数）。第二基本定理：$\\int_a^b f=F(b)-F(a)$，让定积分计算变成「找原函数、代两端、相减」。两个定理揭示了微分与积分互为逆运算。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第三章 积分计算技巧 ============================ */
    {
      id: 'p5c3',
      number: 3,
      title: '积分计算技巧',
      intro:
        '有了基本定理，剩下的挑战就是「怎么找原函数」。这一章配备一套工具箱：换元法拆复合函数，分部积分法拆乘积，三角恒等式与三角换元处理三角式和根式，部分分式拆解有理函数，最后初识反常积分。工具没有高下，关键看什么时候用哪一件。',
      outcomes: [
        '会用换元法处理「复合函数乘以内部导数」型积分',
        '会用分部积分法处理乘积型积分，会选 u 和 dv',
        '掌握三角函数积分的奇偶次幂策略与部分分式法',
        '理解反常积分的收敛与发散，会算简单的无穷区间积分',
      ],
      topics: [
        {
          id: 'p5c3t1',
          title: '换元积分法',
          objective: '会用换元法把复合函数积分化为简单积分，并会验算',
          minutes: 22,
          blocks: {
            background: [
              {
                title: '链式法则倒过来用',
                text: '求导时我们用链式法则处理复合函数，比如 $(e^{x^2})\'=2x e^{x^2}$。注意导数里多出来的 $2x$——它正是内部函数 $x^2$ 的导数。换元法就是把这个过程倒放：看到被积函数里「某函数 + 它的导数（差个常数）」，就把它还原成复合函数的积分。',
              },
            ],
            plain: [
              {
                text: '把复合函数想成套娃。换元就是先把外层壳 $t=g(x)$ 剥出来，把积分从 $x$ 的世界搬到 $t$ 的世界，在 $t$ 世界里积分通常简单得多，最后再套回去。**什么时候用**：当被积函数里有一块 $g(x)$，而它的导数 $g\'(x)$ 也在场（允许差一个常数因子）。$dx$ 不能随手改成 $dt$，必须按 $dt=g\'(x)dx$ 换算。',
              },
            ],
            definition: [
              {
                title: '换元法公式',
                text: '设 $t=g(x)$ 可导，若被积函数能写成 $f(g(x))g\'(x)$ 的形式，则 $$\\int f(g(x))g\'(x)\\,dx=\\int f(t)\\,dt=F(t)+C=F(g(x))+C.$$ 其理论依据正是链式法则。',
              },
            ],
            keyFormulas: [
              { latex: '\\int f(g(x))g\'(x)\\,dx=\\int f(t)\\,dt\\quad(t=g(x))', meaning: '换元法主体公式：把复合函数还原', display: 'block' },
              { latex: '\\int \\frac{f\'(x)}{f(x)}\\,dx=\\ln|f(x)|+C', meaning: '分子恰是分母导数时，直接得对数', note: '换元 $t=f(x)$ 的特例' },
              { latex: '\\text{定积分换元：}\\,x=a,b\\ \\Rightarrow\\ t=g(a),g(b)', meaning: '定积分换元时，上下限也要跟着换成 t 的值' },
            ],
            derivation: {
              intro: '换元法为什么成立？',
              steps: [
                { action: '设 $F\'(t)=f(t)$', latex: '$\\int f(t)\\,dt=F(t)+C$', why: '按原函数定义。' },
                { action: '令 $t=g(x)$，用链式法则', latex: '$\\frac{d}{dx}F(g(x))=F\'(g(x))g\'(x)=f(g(x))g\'(x)$', why: '复合函数求导。' },
                { action: '两边积分', latex: '$\\int f(g(x))g\'(x)\\,dx=F(g(x))+C$', why: '这正是换元公式的结论。' },
              ],
            },
            examplesBasic: [
              {
                title: '基本换元',
                level: 'basic',
                asking: '求 $\\int x\\cos(x^2)\\,dx$。',
                given: ['被积函数含 $\\cos(x^2)$，外面有因子 $x$'],
                method: ['认出 $x^2$ 的导数是 $2x$（与因子 $x$ 差常数 2）', '设 $t=x^2$'],
                steps: [
                  { action: '设内部函数', latex: '$t=x^2\\Rightarrow dt=2x\\,dx\\Rightarrow x\\,dx=\\frac{dt}{2}$', why: '算出微分关系，才能把 $x\\,dx$ 换成 $t$ 的语言。' },
                  { action: '整体换元', latex: '$\\int x\\cos(x^2)\\,dx=\\int \\cos(t)\\cdot\\frac{dt}{2}$', why: '把 $\\cos(x^2)$ 换成 $\\cos t$，$x\\,dx$ 换成 $\\frac{dt}{2}$。' },
                  { action: '提出常数并积分', latex: '$=\\frac12\\int \\cos t\\,dt=\\frac12\\sin t+C$', why: '在 $t$ 世界里是基本积分。' },
                  { action: '换回 x', latex: '$=\\frac12\\sin(x^2)+C$', why: '把 $t=x^2$ 代回原变量。' },
                ],
                result: '$\\dfrac12\\sin(x^2)+C$。',
                check: '求导：$\\frac12\\cos(x^2)\\cdot2x=x\\cos(x^2)$ ✓。',
                pitfall: '别忘了 $dt=2x\\,dx$ 里的因子 2，漏掉会导致答案差一倍。',
              },
            ],
            examplesAdvanced: [
              {
                title: '定积分的换元（上限变成 t 的世界）',
                level: 'advanced',
                asking: '计算 $\\int_1^2 \\frac{2x}{x^2+1}\\,dx$。',
                given: ['分母 $x^2+1$ 的导数是 $2x$，恰是分子'],
                method: ['设 $t=x^2+1$', '上下限一并换成 t 的值'],
                steps: [
                  { action: '设 t 并求微分', latex: '$t=x^2+1\\Rightarrow dt=2x\\,dx$', why: '分子正好凑成 $dt$。' },
                  { action: '换算上下限', latex: '$x=1\\Rightarrow t=2;\\quad x=2\\Rightarrow t=5$', why: '定积分换元时，限要跟着变成 $t$ 的值，否则「限和变量不匹配」。' },
                  { action: '改写积分', latex: '$\\int_1^2 \\frac{2x}{x^2+1}\\,dx=\\int_2^5 \\frac{1}{t}\\,dt$', why: '整体换成 $t$ 的语言。' },
                  { action: '计算', latex: '$=[\\ln t]_2^5=\\ln5-\\ln2=\\ln\\frac52$', why: '用 $\\int\\frac1t dt=\\ln|t|$。' },
                ],
                result: '$\\ln\\dfrac52$。',
                check: '直接用特例公式：$\\ln|x^2+1|$ 从 1 到 2 得 $\\ln5-\\ln2$ ✓。',
                pitfall: '换成 $t$ 后若仍用原来的限 1、2，会把上限算成 $\\ln2-\\ln1$，错。',
              },
            ],
            mistakes: [
              { title: 'dx 不能随便改成 dt', text: '必须先写 $dt=g\'(x)dx$，算出 $dx$ 与 $dt$ 的换算关系，再整体替换。' },
              { title: '换元后要换回去', text: '不定积分算完要把 $t$ 换回 $x$；定积分换元后直接算新限，无需换回。' },
            ],
            summary: [
              { text: '换元法是链式法则的逆用：当被积函数含 $g(x)$ 且 $g\'(x)$ 也在场，设 $t=g(x)$ 化简。定积分换元要同时换上下限。常用特例：$\\int\\frac{f\'}{f}dx=\\ln|f|+C$。' },
            ],
          },
        },
        {
          id: 'p5c3t2',
          title: '分部积分法',
          objective: '会用分部积分公式，能合理选择 u 和 dv 处理乘积型积分',
          minutes: 22,
          blocks: {
            background: [
              {
                title: '乘积法则倒过来用',
                text: '换元法逆用链式法则，分部积分法则逆用乘积法则：$(uv)\'=u\'v+uv\'$。把两边积分整理一下，就得到一个处理「两个函数相乘」的积分公式。像 $\\int x e^x dx$ 这种换元帮不上忙的题，分部积分正好派上用场。',
              },
            ],
            plain: [
              {
                text: '分部积分像「分工合作」：把被积函数拆成 $u$ 和 $dv$ 两块，让 $u$ 求导后变简单、$dv$ 积分后不更难，公式是 $uv-\\int v\\,du$。**怎么选 $u$**：多项式、对数、反三角函数适合当 $u$（求导会「降级」）；指数、三角函数适合当 $dv$（积分还是它自己，不会变复杂）。口诀：对数、反三角、多项式、三角、指数，越靠前越该当 $u$。',
              },
            ],
            definition: [
              {
                title: '分部积分公式',
                text: '若 $u(x),v(x)$ 可导，则 $$\\int u\\,dv=uv-\\int v\\,du,$$ 即 $\\int u(x)v\'(x)dx=u(x)v(x)-\\int v(x)u\'(x)dx$。$C$ 最后统一加一个即可。',
              },
            ],
            keyFormulas: [
              { latex: '\\int u\\,dv=uv-\\int v\\,du', meaning: '分部积分主公式：把难积分转成另一次积分', display: 'block' },
              { latex: '\\int x e^{x}\\,dx=xe^{x}-e^{x}+C', meaning: '典型例子：多项式配指数', note: '取 $u=x,\\ dv=e^xdx$' },
            ],
            derivation: {
              intro: '公式从乘积法则来：',
              steps: [
                { action: '写出乘积法则', latex: '(uv)\'=u\'v+uv\'', why: '两个函数乘积的求导公式。' },
                { action: '把要积分的那块单独留在左边', latex: '$uv\'=(uv)\'-u\'v$', why: '从乘积法则移项，让 $uv\'$ 孤立在左边。' },
                { action: '两边积分', latex: '$\\int u v\'\\,dx=uv-\\int u\'v\\,dx$', why: '$uv$ 求导的原函数就是 $uv$，得到分部积分公式。' },
              ],
            },
            examplesBasic: [
              {
                title: '多项式 × 指数',
                level: 'basic',
                asking: '求 $\\int x e^{x}\\,dx$。',
                given: ['被积函数是两个函数相乘'],
                method: ['取 $u=x$（求导变简单），$dv=e^xdx$（积分还是自己）'],
                steps: [
                  { action: '设定 u 和 dv', latex: '$u=x,\\ dv=e^xdx\\Rightarrow du=dx,\\ v=e^x$', why: '$v$ 由对 $dv$ 积分得到，此处不写 $+C$（最后统一加）。' },
                  { action: '套用公式', latex: '$\\int xe^xdx=uv-\\int v\\,du=xe^x-\\int e^xdx$', why: '按 $uv-\\int v du$ 代入。' },
                  { action: '算剩余积分', latex: '$=xe^x-e^x+C$', why: '$\\int e^xdx=e^x$，最后加一个 $C$。' },
                ],
                result: '$xe^x-e^x+C$。',
                check: '求导：$(xe^x-e^x)\'=e^x+xe^x-e^x=xe^x$ ✓。',
                pitfall: '若反过来取 $u=e^x,\\ dv=xdx$，会越积越复杂，说明分工选反了。',
              },
            ],
            examplesAdvanced: [
              {
                title: '需要用两次分部积分',
                level: 'advanced',
                asking: '求 $\\int x^2\\sin x\\,dx$。',
                given: ['多项式 $x^2$ 配三角 $\\sin x$'],
                method: ['取 $u=x^2$ 降次，做两次分部积分'],
                steps: [
                  { action: '第一次分部', latex: '$u=x^2,\\ dv=\\sin x\\,dx\\Rightarrow du=2x\\,dx,\\ v=-\\cos x$', why: '多项式求导降次；$\\int\\sin xdx=-\\cos x$。' },
                  { action: '套公式', latex: '$\\int x^2\\sin x\\,dx=-x^2\\cos x+\\int 2x\\cos x\\,dx$', why: '注意 $-\\int v\\,du=-\\int(-\\cos x)2x dx=+\\int 2x\\cos xdx$，符号别错。' },
                  { action: '第二次分部', latex: '$\\int 2x\\cos x\\,dx$: 取 $u=2x,\\ dv=\\cos xdx\\Rightarrow du=2dx,\\ v=\\sin x$', why: '多项式从 $x^2$ 降到 $x$，再做一次。' },
                  { action: '算出第二块', latex: '$=2x\\sin x-\\int 2\\sin x\\,dx=2x\\sin x+2\\cos x$', why: '$\\int\\sin xdx=-\\cos x$，所以 $-\\int2\\sin xdx=+2\\cos x$。' },
                  { action: '合并', latex: '$\\int x^2\\sin x\\,dx=-x^2\\cos x+2x\\sin x+2\\cos x+C$', why: '两部分相加，加一个 $C$。' },
                ],
                result: '$-x^2\\cos x+2x\\sin x+2\\cos x+C$。',
                check: '求导：$(-2x\\cos x+x^2\\sin x)+(2\\sin x+2x\\cos x)-2\\sin x=x^2\\sin x$ ✓。',
                pitfall: '$v=-\\cos x$ 的负号最容易漏，导致后续全错。',
              },
            ],
            mistakes: [
              { title: 'u 和 dv 选反', text: '若分部后新积分比原来更复杂，多半是分工选反了，退回去重新选 $u$。' },
              { title: 'v 不必加 C', text: '求 $v$ 时取一个最简单的原函数即可（$C=0$），最终的常数统一在答案末尾加一个。' },
            ],
            summary: [
              { text: '分部积分 $\\int u\\,dv=uv-\\int v\\,du$，逆用乘积法则。选 $u$ 的原则：多项式、对数、反三角优先（求导变简单），指数三角当 $dv$。多项式配三角/指数可能需要多次分部；最后对答案求导验算。' },
            ],
          },
        },
        {
          id: 'p5c3t3',
          title: '三角函数积分',
          objective: '掌握三角恒等式与三角函数幂的积分策略',
          minutes: 22,
          blocks: {
            background: [
              {
                text: '三角函数的积分看起来花样多，其实套路清晰：利用恒等式把式子变形，再用简单的换元。教材把 sin、cos 的幂、tan、sec 的幂分别处理，核心工具是 $\\sin^2+\\cos^2=1$ 和倍角公式。',
              },
            ],
            plain: [
              {
                text: '记忆口诀：**sin 或 cos 有奇次幂，就抓奇次那个当「朋友」**——拿出一个和 $dx$ 配对做换元，剩下的偶次用 $\\sin^2+\\cos^2=1$ 改写。如果都是偶次幂，就用倍角公式降幂。**看到 $\\tan$ 或 $\\sec$ 的幂**，用 $1+\\tan^2=\\sec^2$ 每次降 2 次。',
              },
            ],
            definition: [
              {
                title: '常用恒等式与策略',
                text: '勾股恒等式 $\\sin^2x+\\cos^2x=1$；由此得 $1+\\tan^2x=\\sec^2x$。倍角公式 $\\sin^2x=\\frac{1-\\cos 2x}{2}$，$\\cos^2x=\\frac{1+\\cos 2x}{2}$。奇次幂策略：留一个因子做换元；偶次幂策略：倍角降幂。',
              },
            ],
            keyFormulas: [
              { latex: '\\sin^2x=\\frac{1-\\cos 2x}{2},\\qquad \\cos^2x=\\frac{1+\\cos 2x}{2}', meaning: '倍角降幂公式：偶次幂靠它', display: 'block' },
              { latex: '\\int \\tan x\\,dx=\\ln|\\sec x|+C', meaning: '正切的积分', note: '也可写成 $-\\ln|\\cos x|+C$' },
              { latex: '\\int \\sec x\\,dx=\\ln|\\sec x+\\tan x|+C', meaning: '正割的积分，分子分母同乘 $\\sec x+\\tan x$ 得到' },
            ],
            examplesBasic: [
              {
                title: '奇次幂策略',
                level: 'basic',
                asking: '求 $\\int \\sin^3 x\\,dx$。',
                given: ['$\\sin$ 的幂是奇数 3'],
                method: ['拿出一个 $\\sin x$ 配 $du$', '剩下偶次用 $1-\\cos^2x$ 改写'],
                steps: [
                  { action: '拆出奇次因子', latex: '$\\sin^3x=\\sin^2x\\cdot\\sin x=(1-\\cos^2x)\\sin x$', why: '把一个 $\\sin x$ 留给 $du$，剩下的 $\\sin^2x$ 用恒等式改写。' },
                  { action: '设换元', latex: '$u=\\cos x\\Rightarrow du=-\\sin x\\,dx$', why: '导数 $-\\sin x$ 正好在场。' },
                  { action: '改写积分', latex: '$\\int(1-\\cos^2x)\\sin x\\,dx=-\\int(1-u^2)\\,du$', why: '整体换成 $u$。' },
                  { action: '积分并回代', latex: '$=-\\left(u-\\frac{u^3}{3}\\right)+C=-\\cos x+\\frac{\\cos^3 x}{3}+C$', why: '在 $u$ 世界积分后换回 $x$。' },
                ],
                result: '$-\\cos x+\\dfrac{\\cos^3 x}{3}+C$。',
                check: '求导：$\\sin x-\\cos^2x\\sin x=\\sin x(1-\\cos^2x)=\\sin^3x$ ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '偶次幂用倍角降幂',
                level: 'advanced',
                asking: '求 $\\int \\cos^2 x\\,dx$。',
                given: ['$\\cos$ 的幂是偶数 2'],
                method: ['用倍角公式降为一次幂'],
                steps: [
                  { action: '套倍角公式', latex: '$\\cos^2x=\\frac{1+\\cos 2x}{2}$', why: '偶次幂直接积分困难，降幂后变简单。' },
                  { action: '拆成两项', latex: '$\\int\\cos^2x\\,dx=\\frac12\\int 1\\,dx+\\frac12\\int\\cos 2x\\,dx$', why: '利用线性性质拆开。' },
                  { action: '分别积分', latex: '$=\\frac{x}{2}+\\frac12\\cdot\\frac{\\sin 2x}{2}+C$', why: '$\\int\\cos 2xdx=\\frac{\\sin 2x}{2}$（除以内部系数 2）。' },
                  { action: '化简', latex: '$=\\frac{x}{2}+\\frac{\\sin 2x}{4}+C$', why: '整理系数。' },
                ],
                result: '$\\dfrac{x}{2}+\\dfrac{\\sin 2x}{4}+C$。',
                check: '求导：$\\frac12+\\frac14(2\\cos 2x)=\\frac12+\\frac12\\cos 2x=\\cos^2x$ ✓。',
              },
            ],
            application: [
              {
                title: '为什么三角积分重要',
                text: '波动、振动、交流电的量往往是正弦余弦的乘积或幂，求它们的总量（如一个周期内的平均功率）就要用这里的技巧。后面「三角换元」也会把根式积分变成三角幂积分。',
              },
            ],
            mistakes: [
              { title: '奇偶策略用反', text: '奇次幂要「留一个做换元」，偶次幂要用「倍角降幂」。先看幂的奇偶再动手。' },
              { title: '倍角公式符号', text: '$\\cos^2$ 用 $1+\\cos2x$，$\\sin^2$ 用 $1-\\cos2x$，符号记反会全错。' },
            ],
            summary: [
              { text: '三角积分核心：$\\sin^2+\\cos^2=1$ 与倍角公式。奇次幂留一个因子换元、偶次幂倍角降幂；$\\tan$、$\\sec$ 的幂每次降 2 次。做完用求导验算（注意倍角积分要除以内部系数）。' },
            ],
          },
        },
        {
          id: 'p5c3t4',
          title: '有理函数积分与部分分式',
          objective: '会把有理函数分解成部分分式并逐项积分',
          minutes: 22,
          blocks: {
            background: [
              {
                title: '分式怎么办',
                text: '像 $\\frac{x+2}{x^2-1}$ 这样的「多项式除以多项式」叫有理函数。直接积很困难，办法是把它拆成几个简单分式（如 $\\frac{A}{x-1}+\\frac{B}{x+1}$）的和，每个都能用换元或基本公式积出来。',
              },
            ],
            plain: [
              {
                text: '把部分分式想成「拆零件」：先把分母因式分解，再按因子类型写出待定系数的「零件」，用代入数值或比较系数定出未知数，最后逐件积分。有个前提：分子的次数要低于分母；否则先做多项式除法，把整数部分分离出来。',
              },
            ],
            definition: [
              {
                title: '部分分式分解规则',
                text: '分母含线性因子 $(x+a)$ 时，配一项 $\\frac{A}{x+a}$；含 $(x+a)^2$ 时配 $\\frac{A}{x+a}+\\frac{B}{(x+a)^2}$；含不可约二次式 $x^2+px+q$ 时配 $\\frac{Ax+B}{x^2+px+q}$。分解形式只由分母决定。',
              },
            ],
            keyFormulas: [
              { latex: '\\int \\frac{1}{ax+b}\\,dx=\\frac{1}{a}\\ln|ax+b|+C', meaning: '分母为一次式，积分得对数' },
              { latex: '\\int \\frac{1}{x^2+a^2}\\,dx=\\frac{1}{a}\\arctan\\frac{x}{a}+C', meaning: '分母为不可约二次式，配方后得反正切', display: 'block' },
              { latex: 'x^2+px+q=\\left(x+\\frac{p}{2}\\right)^2+\\left(q-\\frac{p^2}{4}\\right)', meaning: '配方：把二次式写成平方和' },
            ],
            examplesBasic: [
              {
                title: '两个不同线性因子',
                level: 'basic',
                asking: '求 $\\int \\frac{1}{x^2-1}\\,dx$。',
                given: ['分母 $x^2-1=(x-1)(x+1)$'],
                method: ['写成部分分式', '代入特殊值定系数'],
                steps: [
                  { action: '写分解式', latex: '$\\frac{1}{(x-1)(x+1)}=\\frac{A}{x-1}+\\frac{B}{x+1}$', why: '两个不同线性因子，各配一个常数分子。' },
                  { action: '两边乘分母', latex: '$1=A(x+1)+B(x-1)$', why: '消去分母，得到恒等式。' },
                  { action: '代入 x=1', latex: '$1=A(2)\\Rightarrow A=\\frac12$', why: '令 $x=1$ 使含 $B$ 的项消失。' },
                  { action: '代入 x=-1', latex: '$1=B(-2)\\Rightarrow B=-\\frac12$', why: '令 $x=-1$ 使含 $A$ 的项消失。' },
                  { action: '积分', latex: '$\\int\\frac{dx}{x^2-1}=\\frac12\\ln|x-1|-\\frac12\\ln|x+1|+C$', why: '逐项用 $\\int\\frac1x dx=\\ln|x|$。' },
                ],
                result: '$\\dfrac12\\ln\\left|\\dfrac{x-1}{x+1}\\right|+C$。',
                check: '对结果求导可还原为 $\\frac{1}{x^2-1}$ ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '不可约二次式：配方 + 换元',
                level: 'advanced',
                asking: '求 $\\int \\frac{x+2}{x^2+2x+5}\\,dx$。',
                given: ['分母判别式 $2^2-4\\cdot5<0$，不可分解'],
                method: ['分母配方', '令 $u=x+1$ 换元', '拆成对数项与反正切项'],
                steps: [
                  { action: '分母配方', latex: '$x^2+2x+5=(x+1)^2+4$', why: '不可约二次式写成平方和，为反正切形式做准备。' },
                  { action: '换元', latex: '$u=x+1\\Rightarrow du=dx,\\ x+2=u+1$', why: '把分子也改写：原分子 $x+2=(x+1)+1=u+1$。' },
                  { action: '拆成两块', latex: '$\\int\\frac{u+1}{u^2+4}du=\\int\\frac{u}{u^2+4}du+\\int\\frac{1}{u^2+4}du$', why: '第一块分子像分母导数（对数），第二块是反正切。' },
                  { action: '分别积分', latex: '$=\\frac12\\ln(u^2+4)+\\frac12\\arctan\\frac{u}{2}+C$', why: '第一块 $\\int\\frac{u}{u^2+4}du=\\frac12\\ln(u^2+4)$；第二块用公式 $\\frac12\\arctan\\frac u2$。' },
                  { action: '回代', latex: '$=\\frac12\\ln(x^2+2x+5)+\\frac12\\arctan\\frac{x+1}{2}+C$', why: '把 $u=x+1$ 换回 $x$。' },
                ],
                result: '$\\dfrac12\\ln(x^2+2x+5)+\\dfrac12\\arctan\\dfrac{x+1}{2}+C$。',
                check: '求导可还原为 $\\frac{x+2}{x^2+2x+5}$ ✓。',
              },
            ],
            mistakes: [
              { title: '分子次数要先看', text: '若分子次数 ≥ 分母次数，先做多项式除法分出整数部分，再对余下的真分式做部分分式。' },
              { title: '待定系数别混字母', text: '不同零件用不同字母 $A,B,C$，解出后仔细回代，别把 $A$、$B$ 对调。' },
            ],
            summary: [
              { text: '有理函数积分路线：先看分子次数（必要时先做除法）→ 分母因式分解 → 写部分分式定系数 → 逐项积分。一次分母得对数，不可约二次分母配方后得反正切。' },
            ],
          },
        },
        {
          id: 'p5c3t5',
          title: '反常积分入门',
          objective: '理解反常积分的收敛与发散，会计算简单的无穷区间积分',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '前面所有定积分都在有限区间上、被积函数也有界。但现实中会遇到两类「越界」：区间延伸到无穷（如从 1 积到 $\\infty$），或被积函数在某点趋于无穷（有垂直渐近线）。这类积分叫反常积分，必须先判断它是否有有限答案。',
              },
            ],
            plain: [
              {
                text: '反常积分像往一个无底洞里倒水：用极限逼近。把无穷区间先截断到一个很大的数 $N$，算完再让 $N\\to\\infty$；把瑕点先用 $\\varepsilon$ 绕开，再让 $\\varepsilon\\to0$。如果这个极限是一个有限的数，就说积分**收敛**；如果极限不存在（趋于无穷或振荡），就说**发散**。',
              },
            ],
            definition: [
              {
                title: '两类反常积分',
                text: '① 无穷区间：$\\int_a^{\\infty} f(x)dx=\\lim_{N\\to\\infty}\\int_a^{N} f(x)dx$；② 瑕积分（$f$ 在 $a$ 处无界）：$\\int_a^b f(x)dx=\\lim_{\\varepsilon\\to0^+}\\int_{a+\\varepsilon}^{b} f(x)dx$。若极限存在且有限则收敛，否则发散。区间内部有瑕点时要拆开分别判断，只有每一块都收敛，整体才收敛。',
              },
            ],
            keyFormulas: [
              { latex: '\\int_a^{\\infty} f(x)\\,dx=\\lim_{N\\to\\infty}\\int_a^{N} f(x)\\,dx', meaning: '无穷区间反常积分的定义', display: 'block' },
              { latex: '\\int_1^{\\infty}\\frac{1}{x^p}\\,dx\\ (p>1)\\ \\text{收敛},\\quad p\\leq1\\ \\text{发散}', meaning: '无穷区间的 p 判别法' },
              { latex: '\\int_0^{1}\\frac{1}{x^p}\\,dx\\ (p<1)\\ \\text{收敛},\\quad p\\geq1\\ \\text{发散}', meaning: '瑕点在 0 的 p 判别法（条件与上面相反）', note: '两个 p 判别法临界条件相反，别混' },
            ],
            examplesBasic: [
              {
                title: '收敛的无穷区间积分',
                level: 'basic',
                asking: '计算 $\\int_1^{\\infty} \\frac{1}{x^2}\\,dx$，判断收敛性。',
                given: ['区间无穷，被积函数 $1/x^2$'],
                method: ['截断到 $N$，算极限'],
                steps: [
                  { action: '写成极限', latex: '$\\int_1^{\\infty}\\frac{1}{x^2}dx=\\lim_{N\\to\\infty}\\int_1^{N}x^{-2}dx$', why: '按定义截断。' },
                  { action: '求原函数', latex: '$=\\lim_{N\\to\\infty}\\left[-\\frac{1}{x}\\right]_1^{N}$', why: '$\\int x^{-2}dx=-x^{-1}$。' },
                  { action: '代入并取极限', latex: '$=\\lim_{N\\to\\infty}\\left(-\\frac1N+1\\right)=1$', why: '$N\\to\\infty$ 时 $\\frac1N\\to0$。' },
                ],
                result: '积分收敛，值为 $1$。',
                check: '$p=2>1$，符合 p 判别法（收敛）✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '瑕点积分：收敛与发散的对比',
                level: 'advanced',
                asking: '判断 $\\int_0^1 \\frac{1}{x}dx$ 与 $\\int_0^1 \\frac{1}{\\sqrt{x}}dx$ 的收敛性。',
                given: ['两个积分在 $x=0$ 处都有瑕点'],
                method: ['绕过瑕点取极限', '与 p 判别法对照'],
                steps: [
                  { action: '第一个写成极限', latex: '$\\int_0^1\\frac1xdx=\\lim_{\\varepsilon\\to0^+}[\\ln x]_{\\varepsilon}^{1}$', why: '从 $\\varepsilon$ 积到 1。' },
                  { action: '求极限', latex: '$=\\lim_{\\varepsilon\\to0^+}(0-\\ln\\varepsilon)=+\\infty$', why: '$\\ln\\varepsilon\\to-\\infty$，故发散。' },
                  { action: '第二个写成极限', latex: '$\\int_0^1\\frac{1}{\\sqrt{x}}dx=\\lim_{\\varepsilon\\to0^+}[2\\sqrt{x}]_{\\varepsilon}^{1}$', why: '$\\int x^{-1/2}dx=2\\sqrt x$。' },
                  { action: '求极限', latex: '$=\\lim_{\\varepsilon\\to0^+}(2-2\\sqrt{\\varepsilon})=2$', why: '极限有限，收敛于 2。' },
                ],
                result: '$\\int_0^1\\frac1xdx$ 发散；$\\int_0^1\\frac{1}{\\sqrt x}dx$ 收敛于 $2$。',
                check: '$p=1$ 发散、$p=\\frac12<1$ 收敛，符合瑕点 p 判别法 ✓。',
                pitfall: '两套 p 判别法条件相反：无穷区间要 $p>1$ 才收敛，瑕点 $0$ 要 $p<1$ 才收敛。',
              },
            ],
            mistakes: [
              { title: '先判断收敛再计算', text: '反常积分最重要的是先判断收敛还是发散；发散的积分硬算出「值」没有意义。' },
              { title: '瑕点在内部要拆开', text: '若瑕点在积分区间内部，用区间可加性拆成几块，每块各自取极限，全部收敛整体才收敛。' },
            ],
            summary: [
              { text: '反常积分用极限处理「无穷区间」或「无界被积函数」：极限有限则收敛，否则发散。无穷区间 $\\int_1^\\infty x^{-p}dx$ 要 $p>1$ 收敛；瑕点在 0 的 $\\int_0^1 x^{-p}dx$ 要 $p<1$ 收敛，条件恰好相反。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第四章 积分的实际应用 ============================ */
    {
      id: 'p5c4',
      number: 4,
      title: '积分的实际应用',
      intro:
        '前面攒了这么多工具，这一章集中兑现：算平面图形面积、算旋转体体积、由速度求路程、由变化率求累积总量、算函数在区间上的平均值。你会看到，这些看似不同的问题，最后都归为同一件事——写出「小片量」，然后积分。',
      outcomes: [
        '会用定积分求曲线围成的平面图形面积',
        '会用圆盘法和壳法求旋转体体积',
        '理解位移与路程的区别，会用积分处理累积变化量',
        '会计算函数在区间上的平均值并理解积分中值定理',
      ],
      topics: [
        {
          id: 'p5c4t1',
          title: '平面图形的面积',
          objective: '会用定积分求曲线与坐标轴、两曲线之间的面积',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '定积分给的是「有向面积」，可实际问题要的是「实际面积」（永远为正）。两者的差别在曲线穿过 $x$ 轴时才出现：这时要把区间在交点处分段，对每段积分取绝对值再相加。',
              },
            ],
            plain: [
              {
                text: '求面积像量一块不规则的田：先画草图、找交点（田的边界在哪相交），再决定用竖条还是横条。**曲线与 $x$ 轴之间**：分段取绝对值。**两曲线之间**：用「上面那条减下面那条」再积分，若中途上下关系变了，也要分段。关键一步是先画图判断谁上谁下。',
              },
            ],
            definition: [
              {
                title: '面积公式',
                text: '曲线 $y=f(x)$ 与 $x$ 轴、$x=a$、$x=b$ 围成的实际面积为 $\\int_a^b |f(x)|\\,dx$（在零点处分段取绝对值）。两曲线 $y=f(x)$、$y=g(x)$ 之间的面积为 $\\int_a^b |f(x)-g(x)|\\,dx$；若在 $[a,b]$ 上恒有 $f\\geq g$，则绝对值可去掉，写成 $\\int_a^b [f(x)-g(x)]dx$。',
              },
            ],
            keyFormulas: [
              { latex: '\\text{面积}=\\int_a^b |f(x)|\\,dx', meaning: '与 x 轴围成的实际面积，注意分段取绝对值', display: 'block' },
              { latex: '\\text{面积}=\\int_a^b [f_{\\text{上}}(x)-g_{\\text{下}}(x)]\\,dx', meaning: '两曲线之间：上曲线减下曲线', note: '先求交点判断上下关系' },
              { latex: '\\text{面积}=\\int_A^B [\\text{右曲线}-\\text{左曲线}]\\,dy', meaning: '与 y 轴相关时，对 y 积分、右减左' },
            ],
            derivation: {
              intro: '为什么两曲线之间是「上减下」？',
              steps: [
                { action: '取一个竖条', latex: '高 $=f(x)-g(x)$，宽 $=dx$', why: '竖条从上曲线 $f$ 延伸到下曲线 $g$，长度是两者之差。' },
                { action: '竖条面积', latex: '$=[f(x)-g(x)]\\,dx$', why: '面积 = 高 × 宽。' },
                { action: '积分累加', latex: '$\\int_a^b [f(x)-g(x)]\\,dx$', why: '把所有竖条加起来，就是总面积。' },
              ],
            },
            examplesBasic: [
              {
                title: '抛物线与 x 轴',
                level: 'basic',
                asking: '求 $y=x^2$、$x$ 轴、$x=0$、$x=2$ 围成的面积。',
                given: ['$y=x^2$ 在 $[0,2]$ 上始终非负'],
                method: ['非负，直接积分', '用幂函数公式'],
                steps: [
                  { action: '确认符号', latex: '$x^2\\geq0$，无需分段', why: '曲线全程在 $x$ 轴上方。' },
                  { action: '写积分', latex: '$\\int_0^2 x^2\\,dx$', why: '按面积公式写出定积分。' },
                  { action: '计算', latex: '$=\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8}{3}$', why: '找原函数、代两端、相减。' },
                ],
                result: '面积为 $\\dfrac{8}{3}$（平方单位）。',
                check: '与前面黎曼和、基本定理的结果一致 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '两曲线之间（上下关系会交换）',
                level: 'advanced',
                asking: '求 $y=x$ 与 $y=x^2$ 在 $x\\in[0,2]$ 之间围成的面积。',
                given: ['两曲线交于 $x=0$ 和 $x=1$'],
                method: ['在交点 1 处分段', '分别判断上下关系并取绝对值'],
                steps: [
                  { action: '求交点', latex: '$x=x^2\\Rightarrow x=0$ 或 $x=1$', why: '令两函数相等，确定分段点。' },
                  { action: '判断上下', latex: '$[0,1]$ 上 $x\\geq x^2$；$[1,2]$ 上 $x^2\\geq x$', why: '取测试点比较，如 $x=0.5$ 时 $0.5>0.25$。' },
                  { action: '第一段积分', latex: '$\\int_0^1 (x-x^2)dx=\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1=\\frac12-\\frac13=\\frac16$', why: '上减下：$x$ 减 $x^2$。' },
                  { action: '第二段积分', latex: '$\\int_1^2 (x^2-x)dx=\\left[\\frac{x^3}{3}-\\frac{x^2}{2}\\right]_1^2=\\left(\\frac83-2\\right)-\\left(\\frac13-\\frac12\\right)=\\frac23+\\frac16=\\frac56$', why: '上减下改为 $x^2$ 减 $x$。' },
                  { action: '相加', latex: '$\\frac16+\\frac56=1$', why: '两段实际面积相加。' },
                ],
                result: '面积为 $1$（平方单位）。',
                check: '若不分段的 $\\int_0^2(x-x^2)dx=\\frac23-\\frac83=-2$，负值说明必须分段 ✓。',
                pitfall: '直接算 $\\int_0^2(x-x^2)dx$ 会因正负抵消得到错误结果。',
              },
            ],
            figure: {
              kind: 'integral',
              initialFn: 'x-x^2',
              caption: '观察 $y=x$ 与 $y=x^2$ 的交点：在 $x=1$ 处上下曲线交换，体会为什么求面积要在交点处分段。',
            },
            mistakes: [
              { title: '忘记分段', text: '曲线穿越坐标轴或两曲线交换上下时，必须分段并取绝对值，否则正负面积抵消。' },
              { title: '上下判断错误', text: '先算交点，再在每个子区间取一个测试点比较大小，别凭图像感觉。' },
            ],
            summary: [
              { text: '求实际面积：先画草图、求交点，确定谁上谁下；曲线与轴之间分段取 $|f|$，两曲线之间取「上减下」。本质是「小竖条面积 = 高 × 宽」的积分累加。' },
            ],
          },
        },
        {
          id: 'p5c4t2',
          title: '旋转体体积',
          objective: '会用圆盘法和壳法求平面区域绕坐标轴旋转所得立体的体积',
          minutes: 22,
          blocks: {
            background: [
              {
                text: '把一个平面区域绕坐标轴转一圈，会得到立体（如半圆绕直径转成球）。怎么算它的体积？和求面积一样的思路——把区域切成小条，让每条旋转成一个「小零件」，把这些零件的体积加起来。',
              },
            ],
            plain: [
              {
                text: '两种切法对应两种方法。**圆盘法**：小条绕与它短边平行的轴旋转，成一个薄圆盘，体积 $\\pi y^2 dx$。**壳法**：小条绕与它短边垂直的轴旋转，成一个薄圆筒（像易拉罐），体积 $2\\pi x y\\,dx$。选择口诀：小条短边**平行**于旋转轴用圆盘法，**垂直**于旋转轴用壳法。',
              },
            ],
            definition: [
              {
                title: '圆盘法与壳法公式',
                text: '曲线 $y=f(x)$ 下方、$x=a$ 到 $x=b$ 的区域：绕 $x$ 轴旋转（圆盘法）体积 $V=\\pi\\int_a^b [f(x)]^2 dx$；绕 $y$ 轴旋转（壳法）体积 $V=2\\pi\\int_a^b x f(x)\\,dx$。若区域在两曲线之间，用「外减内」取体积差。',
              },
            ],
            keyFormulas: [
              { latex: 'V_{\\text{绕}x\\text{轴}}=\\pi\\int_a^b [f(x)]^2\\,dx', meaning: '圆盘法：圆盘半径是 $y=f(x)$', display: 'block' },
              { latex: 'V_{\\text{绕}y\\text{轴}}=2\\pi\\int_a^b x f(x)\\,dx', meaning: '壳法：壳半径是 $x$、高是 $f(x)$', display: 'block' },
              { latex: 'V=\\int_a^b A(x)\\,dx', meaning: '一般立体：横截面积为 $A(x)$ 的切片法' },
            ],
            derivation: {
              intro: '圆盘与壳的体积怎么来？',
              steps: [
                { action: '圆盘', latex: '$=\\pi r^2 h=\\pi y^2 dx$', why: '薄圆盘就是半径 $y$、厚 $dx$ 的矮圆柱。' },
                { action: '壳', latex: '$=2\\pi r\\cdot h\\cdot dx=2\\pi x y\\,dx$', why: '薄圆筒展开近似长方体：长是周长 $2\\pi x$、高 $y$、厚 $dx$。' },
                { action: '积分累加', latex: '$V=\\int(\\text{小零件体积})$', why: '零件厚度趋于 0 时，求和变积分。' },
              ],
            },
            examplesBasic: [
              {
                title: '绕 x 轴：圆盘法',
                level: 'basic',
                asking: '求 $y=x^2$、$x=0$、$x=1$、$x$ 轴围成区域绕 $x$ 轴旋转的体积。',
                given: ['区域在曲线下方', '绕 $x$ 轴旋转 → 圆盘法'],
                method: ['圆盘半径 $y=x^2$', '用 $V=\\pi\\int y^2 dx$'],
                steps: [
                  { action: '写半径', latex: '$y=x^2\\Rightarrow y^2=x^4$', why: '圆盘体积公式里用的是半径的平方。' },
                  { action: '写积分', latex: '$V=\\pi\\int_0^1 x^4\\,dx$', why: '代入圆盘法公式。' },
                  { action: '计算', latex: '$=\\pi\\left[\\frac{x^5}{5}\\right]_0^1=\\frac{\\pi}{5}$', why: '幂函数积分。' },
                ],
                result: '体积为 $\\dfrac{\\pi}{5}$（立方单位）。',
                check: '体积为正且量级合理 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '绕 y 轴：壳法',
                level: 'advanced',
                asking: '求上例同一区域绕 $y$ 轴旋转的体积。',
                given: ['同一区域 $y=x^2,\\ x\\in[0,1]$', '绕 $y$ 轴旋转 → 壳法'],
                method: ['壳半径 $x$、高 $x^2$', '用 $V=2\\pi\\int x y\\,dx$'],
                steps: [
                  { action: '写被积函数', latex: '$2\\pi x\\cdot f(x)=2\\pi x\\cdot x^2=2\\pi x^3$', why: '壳半径是 $x$，高是 $y=x^2$。' },
                  { action: '写积分', latex: '$V=2\\pi\\int_0^1 x^3\\,dx$', why: '代入壳法公式。' },
                  { action: '计算', latex: '$=2\\pi\\left[\\frac{x^4}{4}\\right]_0^1=\\frac{\\pi}{2}$', why: '幂函数积分。' },
                ],
                result: '体积为 $\\dfrac{\\pi}{2}$（立方单位）。',
                check: '用圆盘法（横向切片）也可得 $\\frac{\\pi}{2}$，两种方法结果应一致 ✓。',
                pitfall: '绕 $y$ 轴若误用圆盘法，积分变量和上下限都要换成 $y$，容易出错；此时壳法更省事。',
              },
            ],
            application: [
              {
                title: '工程中的位置',
                text: '车削零件、设计储罐、计算注射器活塞容积，本质都是旋转体体积。选圆盘还是壳，取决于怎样切小条最省事——这正是数学建模里「选对变量」的缩影。',
              },
            ],
            figure: {
              kind: 'integral',
              initialFn: 'x^2',
              caption: '观察曲线 $y=x^2$ 下的区域：想象它绕轴旋转，体会「小条 → 圆盘/壳 → 积分累加」的建模过程。',
            },
            mistakes: [
              { title: '半径认错', text: '圆盘法的半径是到旋转轴的距离（常是 $y$ 或 $y-h$）；壳法的半径是 $x$（或平移后的 $x-h$）。先画小条再定半径。' },
              { title: '忘记 π 或 2π', text: '圆盘法带 $\\pi$，壳法带 $2\\pi$，漏掉是常见错误。' },
            ],
            summary: [
              { text: '旋转体体积：小条短边平行于轴用圆盘法 $V=\\pi\\int y^2dx$，垂直于轴用壳法 $V=2\\pi\\int xydx$。两曲线之间用体积差。更一般的立体用切片法 $V=\\int A(x)dx$。' },
            ],
          },
        },
        {
          id: 'p5c4t3',
          title: '运动、路程与累积变化量',
          objective: '理解位移与路程的区别，会用积分由变化率求累积总量',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '这是积分最直观的应用：已知每一时刻的速度，求走了多远。位移是「净变化」，有正负；路程是「总共走了多少」，只增不减。教材用「向前开再倒车」的例子把两者讲得很清楚。',
              },
            ],
            plain: [
              {
                text: '位移像记账（收入正、支出负），积分速度 $v$ 即可；路程像汽车里程表（只往上涨），要积分速率 $|v|$。**更一般的道理**：任何「变化率」积分起来都得到「总变化量」——流量积成总水量、功率积成总电能、人口增长率积成总增长。',
              },
            ],
            definition: [
              {
                title: '位移、路程与净变化',
                text: '物体在 $[a,b]$ 上的位移为 $\\int_a^b v(t)\\,dt$，路程为 $\\int_a^b |v(t)|\\,dt$。一般地，若 $F\'(t)=f(t)$ 是某量的变化率，则该量在 $[a,b]$ 上的净变化量为 $F(b)-F(a)=\\int_a^b f(t)\\,dt$。',
              },
            ],
            keyFormulas: [
              { latex: '\\text{位移}=\\int_a^b v(t)\\,dt', meaning: '速度的积分：带正负的净变化', display: 'block' },
              { latex: '\\text{路程}=\\int_a^b |v(t)|\\,dt', meaning: '速率的积分：绝对值累加，永不为负', display: 'block' },
              { latex: '\\text{净变化}=\\int_a^b F\'(t)\\,dt=F(b)-F(a)', meaning: '变化率的积分等于总量之差（第二基本定理）' },
            ],
            examplesBasic: [
              {
                title: '匀加速运动的位移',
                level: 'basic',
                asking: '一辆车从静止以速度 $v(t)=t$（米/秒）行驶 2 秒，求位移。',
                given: ['$v(t)=t$', '时间区间 $[0,2]$，速度始终为正'],
                method: ['速度恒正，位移等于路程', '积分速度'],
                steps: [
                  { action: '写积分', latex: '$\\int_0^2 t\\,dt$', why: '位移 = 速度的积分。' },
                  { action: '计算', latex: '$=\\left[\\frac{t^2}{2}\\right]_0^2=2$', why: '幂函数积分，代两端。' },
                ],
                result: '位移为 $2$ 米。',
                check: '速度从 0 线性增到 2，平均速度 1，乘 2 秒得 2 米 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '变速反向：位移与路程分开算',
                level: 'advanced',
                asking: '车以 $40$ km/h 前进 1 小时，再以 $30$ km/h 反向行驶 2 小时，求位移和路程。',
                given: ['$v=40$（前 1 小时），$v=-30$（后 2 小时）'],
                method: ['分段积分：位移用 $v$，路程用 $|v|$'],
                steps: [
                  { action: '求位移', latex: '$\\int_0^1 40\\,dt+\\int_1^3(-30)\\,dt=40-60=-20$', why: '反向速度为负，两段都算进去。' },
                  { action: '求路程（取绝对值）', latex: '$\\int_0^1|40|\\,dt+\\int_1^3|-30|\\,dt=40+60=100$', why: '速率恒正，路程只累加。' },
                  { action: '解释', latex: '位移 $-20$ 表示车最终在出发点反方向 $20$ km 处', why: '负号代表方向，路程 $100$ km 是实际跑过的总距离。' },
                ],
                result: '位移 $-20$ km，路程 $100$ km。',
                check: '路程 ≥ |位移|，符合直觉 ✓。',
                pitfall: '很多人把位移当路程答成 $-20$，注意题目问的是哪一个。',
              },
            ],
            application: [
              {
                title: '生活中的累积量',
                text: '电表读数（功率对时间积分得电能）、水表（流量积分得用水量）、药物在体内的累积剂量，都是「变化率 → 总量」的积分应用。掌握这一个模型，就掌握了一大类问题。',
              },
            ],
            summary: [
              { text: '位移 $=\\int v$（带符号），路程 $=\\int|v|$（取绝对值）。更一般地，变化率的积分给出净变化量 $F(b)-F(a)$。这是第二基本定理最直接的实际意义。' },
            ],
          },
        },
        {
          id: 'p5c4t4',
          title: '平均值与积分中值定理',
          objective: '会计算函数在区间上的平均值，理解积分中值定理',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '一串数字有平均值，一段起伏的函数也有平均值。比如一天的气温不断变化，日平均气温怎么定义？把曲线下的总面积「抹平」成一块等高矩形，矩形的高度就是平均值。',
              },
            ],
            plain: [
              {
                text: '把函数图像想成被搅动的水面，有高有低；等它平静下来，变成一条水平线，水面高度不变——这条水平线的高度就是平均值。教材用鱼缸的水面做比喻，非常形象。积分中值定理进一步保证：连续函数在区间上至少有一个点，函数值恰好等于这个平均值。',
              },
            ],
            definition: [
              {
                title: '平均值与积分中值定理',
                text: '函数 $f$ 在 $[a,b]$ 上的平均值为 $$f_{\\text{av}}=\\frac{1}{b-a}\\int_a^b f(x)\\,dx.$$ 若 $f$ 连续，则存在 $c\\in[a,b]$ 使 $f(c)=f_{\\text{av}}$，这就是积分中值定理。几何上：面积相等，即 $\\int_a^b f(x)dx=f_{\\text{av}}(b-a)$。',
              },
            ],
            keyFormulas: [
              { latex: 'f_{\\text{av}}=\\frac{1}{b-a}\\int_a^b f(x)\\,dx', meaning: '函数在区间上的平均值', display: 'block' },
              { latex: '\\exists c\\in[a,b]:\\ f(c)=f_{\\text{av}}', meaning: '积分中值定理：连续函数必能取到平均值' },
              { latex: 'v_{\\text{av}}=\\frac{1}{b-a}\\int_a^b v(t)\\,dt', meaning: '平均速度 = 总位移 ÷ 总时间' },
            ],
            derivation: {
              intro: '平均值公式怎么理解？',
              steps: [
                { action: '设平均值是高为 $f_{\\text{av}}$ 的水平线', latex: '矩形面积 $=f_{\\text{av}}(b-a)$', why: '水平线下的面积是高乘宽。' },
                { action: '令矩形面积等于曲线下面积', latex: '$f_{\\text{av}}(b-a)=\\int_a^b f(x)\\,dx$', why: '「抹平」前后总面积不变。' },
                { action: '解出平均值', latex: '$f_{\\text{av}}=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$', why: '两边除以 $b-a$。' },
              ],
            },
            examplesBasic: [
              {
                title: '求函数的平均值',
                level: 'basic',
                asking: '求 $f(x)=x^2$ 在 $[0,2]$ 上的平均值。',
                given: ['$f(x)=x^2$，区间 $[0,2]$', '已知 $\\int_0^2 x^2dx=\\frac83$'],
                method: ['套平均值公式'],
                steps: [
                  { action: '写出公式', latex: '$f_{\\text{av}}=\\frac{1}{2-0}\\int_0^2 x^2\\,dx$', why: '$b-a=2$。' },
                  { action: '代入积分值', latex: '$=\\frac12\\cdot\\frac83=\\frac43$', why: '用已知的积分结果。' },
                ],
                result: '平均值为 $\\dfrac43$。',
                check: '$f$ 在 $[0,2]$ 上取值 $0$ 到 $4$，平均值 $\\frac43$ 落在其中 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '找到取到平均值的点 c',
                level: 'advanced',
                asking: '对上例 $f(x)=x^2$ 在 $[0,2]$，求满足 $f(c)=f_{\\text{av}}$ 的 $c$。',
                given: ['$f_{\\text{av}}=\\frac43$'],
                method: ['解方程 $f(c)=\\frac43$', '检查根是否落在区间内'],
                steps: [
                  { action: '列方程', latex: '$c^2=\\frac43$', why: '令函数值等于平均值。' },
                  { action: '求解', latex: '$c=\\pm\\frac{2}{\\sqrt3}$', why: '平方等于 $\\frac43$ 有两个根。' },
                  { action: '筛选', latex: '$c=\\frac{2}{\\sqrt3}\\approx1.15\\in[0,2]$', why: '负根不在区间内，舍去。' },
                ],
                result: '$c=\\dfrac{2}{\\sqrt3}\\approx1.15$。',
                check: '区间内确实存在这样的 $c$，验证了积分中值定理 ✓。',
                pitfall: '中值定理要求函数连续；有间断点的函数未必能取到平均值。',
              },
            ],
            application: [
              {
                title: '平均量随处可见',
                text: '日平均气温、平均功率、一段路程的平均速度、机器学习里一个批次的平均损失，用的都是同一个公式。它把「不断变化的总量」摊平成「一个代表性的常数」。',
              },
            ],
            figure: {
              kind: 'integral',
              initialFn: 'x^2',
              caption: '观察水平线（平均值高度）与曲线：矩形面积与曲线下的面积相等，这就是平均值的几何意义。',
            },
            mistakes: [
              { title: '忘记除以区间长度', text: '平均值是「总面积 ÷ (b-a)」，漏掉除以 $b-a$ 会得到总面积而非平均值。' },
              { title: '中值定理的条件', text: '积分中值定理要求函数在闭区间上连续，别对有间断点的函数滥用。' },
            ],
            summary: [
              { text: '平均值 $f_{\\text{av}}=\\frac{1}{b-a}\\int_a^b f(x)dx$，几何上是「与曲线下面积相等的等高矩形」。积分中值定理保证连续函数在区间上至少取到一次平均值。' },
            ],
          },
        },
      ],
    },
  ],
};
