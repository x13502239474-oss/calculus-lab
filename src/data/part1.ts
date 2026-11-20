import type { Part } from '../types/course';

/**
 * 第一篇：数学基础重建（依据 OpenStax Precalculus 2e）
 * 面向基础薄弱、遗忘高中数学的学习者，从数的语言讲到微积分预备。
 */
export const part1: Part = {
  id: 'part1',
  number: 1,
  title: '数学基础重建',
  subtitle: '从数的语言到函数的世界',
  source: 'OpenStax Precalculus 2e（Jay Abramson）',
  intro:
    '很多人学微积分卡住，不是因为微积分本身难，而是脚下的地基松了。这一篇我们不赶进度，把「数怎么运算、式怎么变形、函数是什么、图像怎么看」这些最底层的能力重新搭牢。每一章都从你熟悉的生活场景讲起，把遗忘的知识一点点捡回来。',
  goal: '具备进入大学微积分所需的数学基础：能熟练操作代数式、理解函数与图像、掌握指数对数与三角函数、看懂变化率。',
  chapters: [
    /* ============================ 第一章 认识数学语言 ============================ */
    {
      id: 'p1c1',
      number: 1,
      title: '认识数学语言',
      intro:
        '数学有自己的「文字」和「语法」。这一章我们重新认识数字家族、正负号、分数与百分数、绝对值，以及运算的先后顺序。别小看这些「小学内容」——它们是后面所有推导的地基。',
      outcomes: [
        '能说出整数、有理数、实数的区别',
        '能熟练进行正负数和分数的四则运算',
        '理解绝对值表示「距离」',
        '能按正确的优先级计算一个混合算式',
      ],
      topics: [
        {
          id: 'p1c1t1',
          title: '数字家族：从自然数到实数',
          objective: '能区分常见的数集，并判断一个数属于哪些数集',
          minutes: 12,
          blocks: {
            background: [
              {
                title: '为什么要给数字分类',
                text: '就像动物要分门别类（哺乳类、鸟类……），数学里也给数字「分家族」。分类不是形式主义，它决定了「哪些运算是允许的」。比如负数开平方在实数范围内不允许，因为她需要引入新家族。',
              },
            ],
            plain: [
              {
                text: '把数想象成一层套一层的盒子：最里面是**自然数**（数数用的 1, 2, 3…），往外一层加上 0 和负数变成**整数**，再往外加上分数变成**有理数**，最外一层再放进 π、√2 这些「不能写成分数」的数，就成了**实数**。你日常接触的几乎所有数，都是实数。',
              },
            ],
            definition: [
              {
                title: '常见数集',
                text: '自然数 $\\mathbb{N}=\\{1,2,3,\\dots\\}$；整数 $\\mathbb{Z}=\\{\\dots,-2,-1,0,1,2,\\dots\\}$；有理数 $\\mathbb{Q}=\\{\\dfrac{p}{q}\\mid p,q\\in\\mathbb{Z},q\\neq0\\}$，即一切能写成两个整数之比的数；实数 $\\mathbb{R}$ 是有理数与无理数的全体。',
              },
            ],
            symbols: [
              {
                title: '逐个符号看',
                text: '符号 $\\in$ 读作「属于」，$3\\in\\mathbb{N}$ 表示 3 是自然数。符号 $\\frac{p}{q}$ 里，$p$ 叫分子，$q$ 叫分母，分母不能为 0（除以 0 没有意义）。',
              },
            ],
            figure: undefined,
            examplesBasic: [
              {
                title: '判断数字归属',
                level: 'basic',
                asking: '判断 $-5$、$\\dfrac{2}{3}$、$\\sqrt{2}$ 分别属于哪些数集。',
                given: ['三个数：$-5$，$\\dfrac{2}{3}$，$\\sqrt{2}$'],
                method: ['各数集的定义', '有理数是能写成整数之比的数'],
                steps: [
                  { action: '看 $-5$', latex: '$-5\\in\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$', why: '它是整数，整数属于有理数，有理数属于实数。它不是自然数（自然数从 1 开始）。' },
                  { action: '看 $\\dfrac{2}{3}$', latex: '$\\dfrac{2}{3}\\in\\mathbb{Q}\\subset\\mathbb{R}$', why: '它本身就是两个整数之比，是有理数；但不是整数。' },
                  { action: '看 $\\sqrt{2}$', latex: '$\\sqrt{2}\\notin\\mathbb{Q},\\ \\sqrt{2}\\in\\mathbb{R}$', why: '$\\sqrt{2}$ 不能写成整数之比，是无理数，但仍属于实数。' },
                ],
                result: '$-5$ 属于整数、有理数、实数；$\\dfrac{2}{3}$ 属于有理数、实数；$\\sqrt{2}$ 属于无理数、实数。',
                check: '每个数都属于实数，符合「日常的数都是实数」的直觉。',
                pitfall: '别把 0 当成自然数（本教程按 $\\mathbb{N}=\\{1,2,3,\\dots\\}$ 的约定）；不同教材对 0 是否算自然数有分歧，做题时看清约定。',
              },
            ],
            mistakes: [
              { title: '分母为 0', text: '$\\dfrac{p}{0}$ 永远无意义，不是 0，也不是无穷大。看到分母可能为 0 时要停下来检查。' },
            ],
            summary: [
              { text: '数的层级：$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$。有理数能写成分数，无理数不能。**所有日常的数都是实数**——这就是微积分默认的活动舞台。' },
            ],
          },
        },
        {
          id: 'p1c1t2',
          title: '正数、负数与绝对值',
          objective: '能进行正负数的四则运算，并理解绝对值是「到原点的距离」',
          minutes: 15,
          blocks: {
            background: [
              {
                text: '温度有零上零下、账户有存款欠款——生活中「方向」和「数量」同样重要。负数就是用来表示相反方向的数。',
              },
            ],
            plain: [
              {
                text: '把数轴想成一条东西向的马路，0 是中心。**正数**在右边，**负数**在左边。$-3$ 不是说「有负三个苹果」，而是说「在相反方向 3 步」。**绝对值** $|x|$ 问的是「这个数离 0 有多远」，距离永远是正的，所以 $|-3|=3$。',
              },
            ],
            definition: [
              {
                title: '绝对值的严格定义',
                text:
                  '$$|x|=\\begin{cases} x, & x\\geq 0\\\\ -x, & x<0\\end{cases}$$' +
                  '注意当 $x<0$ 时，$-x$ 反而是正数（负负得正）。这个「分段」定义后面求极限、去绝对值符号时会反复用到。',
              },
            ],
            symbols: [
              {
                text: '竖线 $|\\cdot|$ 读作「绝对值」。它像一台「取正数机器」：进去 $-7$，出来 $7$；进去 $5$，出来 $5$。',
              },
            ],
            keyFormulas: [
              { latex: '|x|=\\begin{cases}x,&x\\ge0\\\\-x,&x<0\\end{cases}', meaning: '绝对值的分段定义', note: '去绝对值符号时必须先判断里面是正还是负', display: 'block' },
              { latex: '|ab|=|a|\\cdot|b|', meaning: '乘积的绝对值等于绝对值的乘积' },
            ],
            examplesBasic: [
              {
                title: '去绝对值符号',
                level: 'basic',
                asking: '计算 $|-7|$ 和 $|3-8|$。',
                given: ['$|-7|$', '$|3-8|$'],
                method: ['绝对值的分段定义'],
                steps: [
                  { action: '算 $|-7|$', latex: '$-7<0\\Rightarrow|-7|=-(-7)=7$', why: '因为 $-7$ 是负数，按定义取它的相反数。' },
                  { action: '先算绝对值里面', latex: '$3-8=-5$', why: '绝对值符号要先当括号算完内部。' },
                  { action: '再去绝对值', latex: '$|-5|=5$', why: '$-5$ 是负数，取相反数得 5。' },
                ],
                result: '$|-7|=7$，$|3-8|=5$。',
                check: '绝对值结果一定非负，两个答案都是正数，合理。',
              },
            ],
            examplesAdvanced: [
              {
                title: '含字母的绝对值',
                level: 'advanced',
                asking: '化简 $|x-2|$（用分段形式表示）。',
                given: ['表达式 $|x-2|$'],
                method: ['先判断绝对值内部 $x-2$ 的正负', '绝对值的分段定义'],
                steps: [
                  { action: '找分界点', latex: '$x-2=0\\Rightarrow x=2$', why: '内部表达式在 $x=2$ 处变号，这是分段的临界点。' },
                  { action: '当 $x\\ge2$', latex: '$x-2\\ge0\\Rightarrow|x-2|=x-2$', why: '内部非负，直接去掉绝对值。' },
                  { action: '当 $x<2$', latex: '$x-2<0\\Rightarrow|x-2|=-(x-2)=2-x$', why: '内部为负，取相反数，注意要整体变号。' },
                ],
                result: '$|x-2|=\\begin{cases}x-2,&x\\ge2\\\\2-x,&x<2\\end{cases}$',
                check: '代 $x=3$ 得 $|1|=1=3-2$ ✓；代 $x=0$ 得 $|-2|=2=2-0$ ✓。',
                pitfall: '常见错误是忘记给整个 $(x-2)$ 变号，写成 $-x-2$，正确是 $2-x$。',
              },
            ],
            mistakes: [
              { title: '绝对值不等于「去掉负号」这么简单', text: '对 $|x-2|$ 这种，必须先看 $x-2$ 整体的正负，不能想当然。' },
            ],
            summary: [
              { text: '绝对值度量「距离」，永远非负。含字母时按内部表达式的正负**分段**处理——这个技能在第 3 篇求极限、去绝对值时会反复出现。' },
            ],
          },
        },
        {
          id: 'p1c1t3',
          title: '分数、小数、百分数与运算优先级',
          objective: '能熟练进行分数运算，并正确计算混合运算式',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '「先乘除后加减」是小学就学过的口诀，但一旦加入括号、幂、负号，很多人就会算错。这一节把它彻底理顺。',
              },
            ],
            plain: [
              {
                text: '运算优先级像交通规则：先算括号里，再算乘方，再算乘除，最后算加减（口诀 **PEMDAS / 括号指数乘除加减**）。分数 $\\frac{a}{b}$ 其实就是「$a$ 除以 $b$」，通分是把它变成同分母再相加。',
              },
            ],
            definition: [
              {
                title: '运算优先级（从高到低）',
                text: '① 括号 $()\\ []\\ \\{\\}$；② 乘方（指数）$a^n$；③ 乘法与除法（从左到右）；④ 加法与减法（从左到右）。可以用英文口诀 **P**arentheses, **E**xponents, **M**ultiplication/**D**ivision, **A**ddition/**S**ubtraction 记忆。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}', meaning: '分数加法：先通分', note: '分母不能为 0' },
              { latex: '\\frac{a}{b}\\times\\frac{c}{d}=\\frac{ac}{bd}', meaning: '分数乘法：分子乘分子，分母乘分母' },
            ],
            examplesBasic: [
              {
                title: '分数运算',
                level: 'basic',
                asking: '计算 $\\dfrac{1}{2}+\\dfrac{1}{3}$。',
                given: ['$\\dfrac{1}{2}$ 与 $\\dfrac{1}{3}$'],
                method: ['通分后相加'],
                steps: [
                  { action: '找公分母', latex: '$2$ 和 $3$ 的最小公倍数是 $6$', why: '分母相同才能直接相加分子。' },
                  { action: '通分', latex: '$\\frac{1}{2}=\\frac{3}{6},\\quad \\frac{1}{3}=\\frac{2}{6}$', why: '分子分母同时乘相同的数，分数值不变。' },
                  { action: '相加', latex: '$\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$', why: '分母相同，分子直接相加。' },
                ],
                result: '$\\dfrac{5}{6}$',
                check: '$\\frac{1}{2}+\\frac{1}{3}$ 略小于 1，$\\frac{5}{6}\\approx0.83$，合理。',
              },
            ],
            examplesAdvanced: [
              {
                title: '混合运算',
                level: 'advanced',
                asking: '计算 $3+2\\times(4^2-6\\div3)$。',
                given: ['算式 $3+2\\times(4^2-6\\div3)$'],
                method: ['运算优先级：括号 → 指数 → 乘除 → 加减'],
                steps: [
                  { action: '先算括号内的指数', latex: '$4^2=16$', why: '括号最优先，括号内又先算指数。' },
                  { action: '再算括号内的除法', latex: '$6\\div3=2$', why: '括号内先乘除后加减。' },
                  { action: '算括号内的减法', latex: '$16-2=14$', why: '括号内最后算减法。' },
                  { action: '括号外的乘法', latex: '$2\\times14=28$', why: '括号算完，先乘除。' },
                  { action: '最后加法', latex: '$3+28=31$', why: '加减最后算。' },
                ],
                result: '$31$',
                check: '用计算器直接输入验证得 31 ✓。',
                pitfall: '最容易错的是先算 $3+2=5$ 再乘——括号和优先级不能乱。',
              },
            ],
            summary: [
              { text: '分数运算的核心是**通分**；混合运算的核心是**优先级**。把这两件事做扎实，后面所有代数变形都不会在「算术」上翻车。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第二章 基本代数运算 ============================ */
    {
      id: 'p1c2',
      number: 2,
      title: '基本代数运算',
      intro:
        '代数就是把「具体的数」换成「代表未知数的字母」，然后用一套规则来变形。这一章把因式分解、乘法公式、分式、根式这些「变形工具」打磨锋利——它们是解方程和求导的基础功。',
      outcomes: [
        '能合并同类项、展开与因式分解多项式',
        '熟练使用平方差、完全平方等乘法公式',
        '能进行分式与根式的化简',
        '掌握指数与幂的运算规则',
      ],
      topics: [
        {
          id: 'p1c2t1',
          title: '变量、代数式与同类项',
          objective: '能识别同类项并合并，能展开简单的代数式',
          minutes: 15,
          blocks: {
            background: [
              {
                text: '如果知道一个数的 3 倍加 2 等于 11，怎么求这个数？把「这个数」记作 $x$，写成 $3x+2=11$，就能用规则来解。$x$ 就是变量。',
              },
            ],
            plain: [
              {
                text: '**变量**是会变的量（用字母表示），**常量**是固定的数。**代数式**是数与字母用运算符号连起来的式子。**同类项**是字母部分完全相同的项，比如 $3x$ 和 $5x$ 是同类项，可以合并成 $8x$；但 $3x$ 和 $3x^2$ 不是。',
              },
            ],
            definition: [
              {
                title: '同类项',
                text: '所含字母相同，且相同字母的指数也相同的项叫同类项。合并同类项时，只把系数相加减，字母部分保持不变。',
              },
            ],
            examplesBasic: [
              {
                title: '合并同类项',
                level: 'basic',
                asking: '化简 $3x+2y-5x+4y$。',
                given: ['式子 $3x+2y-5x+4y$'],
                method: ['找同类项', '合并系数'],
                steps: [
                  { action: '把同类项放在一起', latex: '$(3x-5x)+(2y+4y)$', why: '$x$ 项和 $y$ 项分别归类。' },
                  { action: '合并 $x$ 项', latex: '$3x-5x=(3-5)x=-2x$', why: '系数相加，字母不变。' },
                  { action: '合并 $y$ 项', latex: '$2y+4y=(2+4)y=6y$', why: '同理。' },
                ],
                result: '$-2x+6y$',
                check: '代 $x=1,y=1$ 到原式：$3+2-5+4=4$；到结果：$-2+6=4$ ✓。',
              },
            ],
            summary: [
              { text: '合并同类项只动系数、不动字母部分。养成「代入数值验证」的习惯，能即时发现变形错误。' },
            ],
          },
        },
        {
          id: 'p1c2t2',
          title: '乘法公式与因式分解',
          objective: '掌握三大乘法公式，能熟练因式分解',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '因式分解是「把和式拆成乘积」，它是解二次方程、求极限时约分的关键工具。乘法公式则是快速展开的捷径。两者互为逆运算。',
              },
            ],
            plain: [
              {
                text: '把因式分解想成「拆乐高」：$x^2+5x+6$ 是一堆积木，能拼回 $(x+2)(x+3)$ 两块。乘法公式是「拼乐高」的快速手法，记住它们能省大量时间。',
              },
            ],
            keyFormulas: [
              { latex: '(a+b)^2=a^2+2ab+b^2', meaning: '完全平方和', display: 'block' },
              { latex: '(a-b)^2=a^2-2ab+b^2', meaning: '完全平方差', display: 'block' },
              { latex: 'a^2-b^2=(a+b)(a-b)', meaning: '平方差（因式分解方向）', display: 'block' },
            ],
            definition: [
              {
                title: '因式分解',
                text: '把一个多项式化成几个整式乘积的形式。常用方法：提公因式、套用乘法公式、十字相乘、分组分解。',
              },
            ],
            examplesBasic: [
              {
                title: '用平方差公式',
                level: 'basic',
                asking: '因式分解 $x^2-9$。',
                given: ['$x^2-9$'],
                method: ['平方差公式 $a^2-b^2=(a+b)(a-b)$'],
                steps: [
                  { action: '写成平方差的形式', latex: '$x^2-9=x^2-3^2$', why: '9 是 3 的平方，套公式需要两个数都是平方。' },
                  { action: '套用公式', latex: '$x^2-3^2=(x+3)(x-3)$', why: '这里 $a=x$，$b=3$。' },
                ],
                result: '$(x+3)(x-3)$',
                check: '展开 $(x+3)(x-3)=x^2-3x+3x-9=x^2-9$ ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '十字相乘法',
                level: 'advanced',
                asking: '因式分解 $x^2+5x+6$。',
                given: ['$x^2+5x+6$'],
                method: ['寻找两个数，乘积为常数项 6，和为一次项系数 5'],
                steps: [
                  { action: '列出乘积为 6 的数对', latex: '$1\\times6,\\ 2\\times3,\\ (-1)\\times(-6),\\ (-2)\\times(-3)$', why: '常数项是 6，找所有整数因子对。' },
                  { action: '找和为 5 的那对', latex: '$2+3=5$', why: '一次项系数是 +5，2 和 3 满足。' },
                  { action: '写出分解', latex: '$x^2+5x+6=(x+2)(x+3)$', why: '两个数分别作为常数项。' },
                ],
                result: '$(x+2)(x+3)$',
                check: '展开得 $x^2+3x+2x+6=x^2+5x+6$ ✓。',
                pitfall: '符号要一起考虑：常数项为正、一次项为正，两个因子都为正。',
              },
            ],
            summary: [
              { text: '三大乘法公式要背熟；因式分解后**展开验证**是好习惯。这个技能在第 3 篇「用因式分解求极限」里会直接用上。' },
            ],
          },
        },
        {
          id: 'p1c2t3',
          title: '指数与幂运算',
          objective: '掌握正整数、零、负整数及分数指数的含义与运算法则',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '指数 $2^3$ 是 $2\\times2\\times2$，这你懂。但 $2^0$、$2^{-3}$、$2^{1/2}$ 分别是什么意思？这些「扩展」是指数函数与对数的基础。',
              },
            ],
            plain: [
              {
                text: '指数的规则设计得「自洽」：为了让 $a^m\\cdot a^n=a^{m+n}$ 在 $m=n$ 时也成立，就定义了 $a^0=1$；为了让 $a^m\\div a^n=a^{m-n}$ 在 $m<n$ 时也成立，就定义了 $a^{-n}=\\frac{1}{a^n}$。规则不是硬记的，是被「逼」出来的。',
              },
            ],
            keyFormulas: [
              { latex: 'a^m\\cdot a^n=a^{m+n}', meaning: '同底数幂相乘，指数相加' },
              { latex: '\\frac{a^m}{a^n}=a^{m-n}', meaning: '同底数幂相除，指数相减' },
              { latex: '(a^m)^n=a^{mn}', meaning: '幂的乘方，指数相乘' },
              { latex: 'a^0=1\\quad (a\\neq0)', meaning: '非零数的 0 次幂等于 1' },
              { latex: 'a^{-n}=\\frac{1}{a^n}', meaning: '负指数表示倒数' },
              { latex: 'a^{1/n}=\\sqrt[n]{a}', meaning: '分数指数表示根' },
            ],
            examplesBasic: [
              {
                title: '负指数与分数指数',
                level: 'basic',
                asking: '计算 $2^{-3}$ 与 $8^{1/3}$。',
                given: ['$2^{-3}$', '$8^{1/3}$'],
                method: ['负指数法则', '分数指数与根的关系'],
                steps: [
                  { action: '算 $2^{-3}$', latex: '$2^{-3}=\\frac{1}{2^3}=\\frac{1}{8}$', why: '负指数表示取倒数。' },
                  { action: '算 $8^{1/3}$', latex: '$8^{1/3}=\\sqrt[3]{8}=2$', why: '$\\frac{1}{3}$ 次幂就是开三次方，因为 $2^3=8$。' },
                ],
                result: '$2^{-3}=\\dfrac{1}{8}$，$8^{1/3}=2$。',
                check: '$2^{-3}$ 是介于 0 和 1 之间的正数 ✓。',
              },
            ],
            summary: [
              { text: '指数法则服务的目标是「让公式对所有指数都自洽」。记住 $a^0=1$、$a^{-n}=\\frac1{a^n}$、$a^{1/n}=\\sqrt[n]{a}$ 这三条扩展，第六篇的指数对数函数就顺理成章。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第三章 方程与不等式 ============================ */
    {
      id: 'p1c3',
      number: 3,
      title: '方程与不等式',
      intro:
        '解方程就像玩天平：等式两边同时做相同操作，平衡不变。这一章从一元一次到一元二次，再到方程组和不等式，把「求未知数」的基本功练熟。',
      outcomes: [
        '能解一元一次与一元二次方程',
        '能解简单的二元一次方程组',
        '能解并表示不等式的解集',
        '能把实际问题翻译成方程',
      ],
      topics: [
        {
          id: 'p1c3t1',
          title: '一元一次方程',
          objective: '能通过移项、合并、化简解一元一次方程',
          minutes: 12,
          blocks: {
            background: [
              {
                text: '「一个数的 3 倍加 2 等于 11，求这个数」——这就是一元一次方程。解方程的目标是把 $x$ 单独留在等号一边。',
              },
            ],
            plain: [
              {
                text: '把方程想成天平。要让 $x$ 孤零零站一边，就一步步「拆掉」它周围的东西：先减掉加上的数，再除以乘上的系数。对一边做的操作，必须对另一边也做。',
              },
            ],
            examplesBasic: [
              {
                title: '解一元一次方程',
                level: 'basic',
                asking: '解方程 $3x+2=11$。',
                given: ['方程 $3x+2=11$'],
                method: ['等式的基本性质：两边同减同除'],
                steps: [
                  { action: '两边同时减 2', latex: '$3x+2-2=11-2\\Rightarrow3x=9$', why: '消掉左边的常数项 +2。' },
                  { action: '两边同时除以 3', latex: '$\\frac{3x}{3}=\\frac{9}{3}\\Rightarrow x=3$', why: '消掉 $x$ 的系数 3，得到 $x$。' },
                ],
                result: '$x=3$',
                check: '代回原式：$3\\times3+2=11$ ✓。',
              },
            ],
            summary: [
              { text: '解方程的三部曲：**化简 → 移项 → 系数化 1**。最后一定代回检验。' },
            ],
          },
        },
        {
          id: 'p1c3t2',
          title: '一元二次方程与求根公式',
          objective: '能用因式分解、配方法、求根公式解一元二次方程',
          minutes: 22,
          blocks: {
            background: [
              {
                text: '二次项出现后，方程可能有两个解。比如 $x^2=4$ 的解是 $x=2$ 和 $x=-2$。求根公式是「万能钥匙」，任何一元二次方程都能用它解开。',
              },
            ],
            plain: [
              {
                text: '一元二次方程标准形 $ax^2+bx+c=0$（$a\\neq0$）。三种解法：能因式分解就用因式分解（最快）；否则用求根公式（最稳）；配方法是求根公式的来源，理解它就知道公式从哪来。',
              },
            ],
            keyFormulas: [
              { latex: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}', meaning: '一元二次方程求根公式', note: '$b^2-4ac$ 叫判别式，决定根的个数：大于 0 两个根，等于 0 一个根，小于 0 无实根', display: 'block' },
            ],
            derivation: {
              intro: '求根公式来自对 $ax^2+bx+c=0$ 配方：',
              steps: [
                { action: '两边除以 $a$', latex: '$x^2+\\frac{b}{a}x+\\frac{c}{a}=0$', why: '让二次项系数为 1，方便配方。' },
                { action: '把常数项移到右边', latex: '$x^2+\\frac{b}{a}x=-\\frac{c}{a}$', why: '左边只留含 $x$ 的项。' },
                { action: '两边加 $(\\frac{b}{2a})^2$ 配方', latex: '$x^2+\\frac{b}{a}x+\\left(\\frac{b}{2a}\\right)^2=-\\frac{c}{a}+\\left(\\frac{b}{2a}\\right)^2$', why: '左边凑成完全平方 $(\\frac{b}{2a}$ 是 $x$ 系数的一半)。' },
                { action: '左边写成平方，右边通分', latex: '$\\left(x+\\frac{b}{2a}\\right)^2=\\frac{b^2-4ac}{4a^2}$', why: '右边通分后分子正是判别式。' },
                { action: '开平方', latex: '$x+\\frac{b}{2a}=\\pm\\frac{\\sqrt{b^2-4ac}}{2a}$', why: '开方有正负两个值。' },
                { action: '移项得公式', latex: '$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$', why: '把 $\\frac{b}{2a}$ 移到右边。' },
              ],
              conclusion: '这就是求根公式，它对所有一元二次方程都成立。',
            },
            examplesBasic: [
              {
                title: '用求根公式',
                level: 'basic',
                asking: '解方程 $x^2-5x+6=0$。',
                given: ['$a=1,\\ b=-5,\\ c=6$'],
                method: ['求根公式（也可因式分解）'],
                steps: [
                  { action: '算判别式', latex: '$\\Delta=b^2-4ac=(-5)^2-4\\cdot1\\cdot6=25-24=1$', why: '先算判别式判断是否实根。' },
                  { action: '代入公式', latex: '$x=\\frac{-(-5)\\pm\\sqrt{1}}{2\\cdot1}=\\frac{5\\pm1}{2}$', why: '$\\Delta>0$，两个实根。' },
                  { action: '分别算两根', latex: '$x_1=\\frac{5+1}{2}=3,\\quad x_2=\\frac{5-1}{2}=2$', why: '取 + 和 - 各一次。' },
                ],
                result: '$x=2$ 或 $x=3$。',
                check: '因式分解 $(x-2)(x-3)=0$ 同样得 2、3 ✓。',
              },
            ],
            mistakes: [
              { title: '判别式为负', text: '当 $b^2-4ac<0$ 时，实数范围内无解（根号下不能为负）。这不是算错，而是方程确实没有实数根。' },
            ],
            summary: [
              { text: '求根公式来自配方法，是解二次方程的万能工具。判别式 $\\Delta$ 决定根的个数，代回或因式分解验证是好习惯。' },
            ],
          },
        },
        {
          id: 'p1c3t3',
          title: '不等式',
          objective: '能解一元一次与简单一元二次不等式并在数轴上表示',
          minutes: 15,
          blocks: {
            background: [
              {
                text: '方程求「相等」的那个点，不等式求「一段范围」。比如「温度高于 30 度」写成 $T>30$，解是一整个区间。',
              },
            ],
            plain: [
              {
                text: '解不等式和解方程几乎一样，唯有一个关键区别：**两边同乘或同除以负数时，不等号方向要翻转**。比如 $-2x>6$ 两边除以 $-2$ 得 $x<-3$。',
              },
            ],
            keyFormulas: [
              { latex: 'a<b\\ \\text{且}\\ c<0\\ \\Rightarrow\\ ac>bc', meaning: '乘/除负数，不等号翻转', note: '这是不等式最易错的地方' },
            ],
            examplesBasic: [
              {
                title: '解一次不等式',
                level: 'basic',
                asking: '解不等式 $-2x+4\\geq10$。',
                given: ['$-2x+4\\geq10$'],
                method: ['移项', '注意除以负数要翻转不等号'],
                steps: [
                  { action: '两边减 4', latex: '$-2x\\geq6$', why: '消去 +4。' },
                  { action: '两边除以 $-2$，翻转不等号', latex: '$x\\leq-3$', why: '除以负数，$\\geq$ 变成 $\\leq$。' },
                ],
                result: '$x\\leq-3$，即区间 $(-\\infty,-3]$。',
                check: '代 $x=-4$：$-2(-4)+4=12\\geq10$ ✓；代 $x=0$：$4\\geq10$ 错，符合 $x$ 应小于 $-3$。',
                pitfall: '忘记翻转不等号是最常见的错误。',
              },
            ],
            summary: [
              { text: '解不等式 = 解方程 + 一条额外规则（乘除变号翻转）。解集通常是区间，可以在数轴上画出来。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第四章 坐标系与函数 ============================ */
    {
      id: 'p1c4',
      number: 4,
      title: '坐标系与函数',
      intro:
        '函数是微积分的主角。这一章我们从平面直角坐标系讲起，建立「函数 = 输入到输出的规则」这个核心概念，并学会看定义域、值域和图像。这是整门课最关键的转折点之一。',
      outcomes: [
        '能在坐标系中定位点、读懂坐标',
        '理解函数的定义、自变量与因变量',
        '能求简单函数的定义域与值域',
        '能通过图像判断函数的增减与变换',
      ],
      topics: [
        {
          id: 'p1c4t1',
          title: '平面直角坐标系',
          objective: '能在坐标系中描点、读点，理解横坐标与纵坐标',
          minutes: 10,
          blocks: {
            background: [
              {
                text: '怎么精确描述地图上「某点的位置」？用两条互相垂直的数轴——水平的 $x$ 轴和竖直的 $y$ 轴，交点叫原点。任何一个点用一对数 $(x,y)$ 就能定位。',
              },
            ],
            plain: [
              {
                text: '坐标 $(x,y)$ 里，$x$ 是**横坐标**（先走左右），$y$ 是**纵坐标**（再走上下）。像「先走到第 3 列，再走到第 2 行」。原点右边 $x$ 为正，上方 $y$ 为正。',
              },
            ],
            examplesBasic: [
              {
                title: '描点与读点',
                level: 'basic',
                asking: '点 $(3,-2)$ 在第几象限？',
                given: ['坐标 $(3,-2)$'],
                method: ['根据横纵坐标正负判断象限'],
                steps: [
                  { action: '看横坐标', latex: '$x=3>0$，在原点右侧', why: '横坐标决定左右。' },
                  { action: '看纵坐标', latex: '$y=-2<0$，在原点下方', why: '纵坐标决定上下。' },
                  { action: '判断象限', latex: '右 + 下 = 第四象限', why: '右下是第四象限（象限按逆时针编号）。' },
                ],
                result: '第四象限。',
                check: '画个草图，点在右下角，符合。',
              },
            ],
            summary: [
              { text: '坐标系把「数」和「形」连接起来。$x$ 管左右、$y$ 管上下，象限按逆时针编号 Ⅰ→Ⅳ。' },
            ],
          },
        },
        {
          id: 'p1c4t2',
          title: '什么是函数',
          objective: '理解函数「一个输入对应唯一输出」的本质，区分自变量与因变量',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '「圆的面积由半径决定」「气温随时间变化」——这些关系的共同点是：一个量确定后，另一个量也随之唯一确定。这就是函数。',
              },
            ],
            plain: [
              {
                text: '把函数想成一台**加工机器**：你投入一个输入 $x$（自变量），机器按固定规则加工，吐出一个唯一的输出 $y$（因变量）。$y=f(x)$ 读作「$y$ 是 $x$ 的函数」。关键：**同一个输入只能有一个输出**（一台机器不会给你两个不同的结果）。',
              },
            ],
            definition: [
              {
                title: '函数的严格定义',
                text: '函数是一个对应规则 $f$，它对定义域中的每个输入 $x$，都指定唯一的一个输出 $f(x)$。$x$ 叫自变量，$f(x)$ 叫因变量。所有允许的输入组成**定义域**，所有可能的输出组成**值域**。',
              },
            ],
            figure: {
              kind: 'function',
              initialFn: 'x^2',
              caption: '观察函数 $y=x^2$：拖动点，看每个 $x$ 如何唯一对应一个 $y$。注意图像关于 $y$ 轴对称。',
            },
            examplesBasic: [
              {
                title: '判断是否为函数',
                level: 'basic',
                asking: '$y^2=x$（$x>0$）中，$y$ 是 $x$ 的函数吗？',
                given: ['关系 $y^2=x$，$x>0$'],
                method: ['函数定义：一个输入对应唯一输出'],
                steps: [
                  { action: '取一个具体输入', latex: '令 $x=4$', why: '用一个例子检验唯一性。' },
                  { action: '解出 $y$', latex: '$y^2=4\\Rightarrow y=2$ 或 $y=-2$', why: '平方等于 4 的数有两个。' },
                  { action: '判断是否唯一', latex: '一个 $x=4$ 对应两个 $y$', why: '违背「唯一输出」。' },
                ],
                result: '不是函数（一个正 $x$ 对应正负两个 $y$）。',
                check: '图像是向右开口的抛物线，竖直线会交两点，通过垂线检验 ✓。',
              },
            ],
            mistakes: [
              { title: '垂线检验', text: '画一条竖直线，如果它与图像最多交一点，就是函数；若交两点，则不是。这是函数定义在图像上的直观版本。' },
            ],
            summary: [
              { text: '函数的核心是**唯一对应**：每个输入只给一个输出。$y=f(x)$ 中 $x$ 是自变量、$y$ 是因变量。垂线检验能快速判断一个图像是不是函数。' },
            ],
          },
        },
        {
          id: 'p1c4t3',
          title: '定义域、值域与图像',
          objective: '能求常见函数的定义域，理解图像与函数的关系',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '不是所有输入都合法：负数不能开偶次方、分母不能为 0、对数真数必须为正。定义域就是「所有合法的输入」。',
              },
            ],
            plain: [
              {
                text: '**定义域**是 $x$ 能取哪些值，**值域**是 $y$ 实际会取到哪些值。求定义域就是排查「哪些 $x$ 会让式子出问题」：遇到 $\\frac{1}{x}$ 排除 $x=0$，遇到 $\\sqrt{x}$ 要求 $x\\geq0$。图像则是把所有点 $(x,f(x))$ 画出来形成的曲线。',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{1}{x}:\\ x\\neq0', meaning: '分母不为 0' },
              { latex: '\\sqrt{x}:\\ x\\geq0', meaning: '偶次根号下非负' },
              { latex: '\\ln x:\\ x>0', meaning: '对数真数为正' },
            ],
            examplesBasic: [
              {
                title: '求定义域',
                level: 'basic',
                asking: '求 $f(x)=\\dfrac{1}{x-3}$ 的定义域。',
                given: ['$f(x)=\\dfrac{1}{x-3}$'],
                method: ['分母不能为 0'],
                steps: [
                  { action: '找出分母', latex: '分母是 $x-3$', why: '限制来自分母。' },
                  { action: '令分母不为 0', latex: '$x-3\\neq0\\Rightarrow x\\neq3$', why: '$x=3$ 会让分母为 0，必须排除。' },
                ],
                result: '定义域为 $\\{x\\mid x\\neq3\\}$，即 $(-\\infty,3)\\cup(3,+\\infty)$。',
                check: '代 $x=3$ 确实无意义，其他值都有意义 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '综合定义域',
                level: 'advanced',
                asking: '求 $f(x)=\\dfrac{\\sqrt{x-1}}{x-4}$ 的定义域。',
                given: ['$f(x)=\\dfrac{\\sqrt{x-1}}{x-4}$'],
                method: ['同时满足根号与分母的限制'],
                steps: [
                  { action: '根号限制', latex: '$x-1\\geq0\\Rightarrow x\\geq1$', why: '偶次根号下非负。' },
                  { action: '分母限制', latex: '$x-4\\neq0\\Rightarrow x\\neq4$', why: '分母不为 0。' },
                  { action: '取交集', latex: '$x\\geq1$ 且 $x\\neq4$', why: '两个条件要同时满足。' },
                ],
                result: '定义域为 $[1,4)\\cup(4,+\\infty)$。',
                check: '$x=1$ 允许（根号为 0），$x=4$ 排除 ✓。',
              },
            ],
            summary: [
              { text: '求定义域就是「排雷」：分母不为 0、偶次根号下非负、对数真数为正，多个限制取交集。图像把函数关系可视化，是理解函数最直观的方式。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第五章 常见函数 ============================ */
    {
      id: 'p1c5',
      number: 5,
      title: '常见函数',
      intro:
        '认识几个「老朋友」：一次函数、二次函数、多项式、有理函数、根式函数，以及反函数。熟悉它们的图像长相，后面求导时就能「看形知性」。',
      outcomes: [
        '掌握一次、二次函数的图像与性质',
        '认识多项式、有理、根式函数',
        '理解反函数的概念与求法',
      ],
      topics: [
        {
          id: 'p1c5t1',
          title: '一次函数与二次函数',
          objective: '掌握一次函数与二次函数的图像、斜率和顶点',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '一次函数画出来是直线，二次函数画出来是抛物线。它们是最简单也最常用的两类函数，也是理解「斜率」和「变化率」的最佳起点。',
              },
            ],
            plain: [
              {
                text: '一次函数 $f(x)=mx+b$：$m$ 是**斜率**（直线有多陡），$b$ 是 $y$ 轴截距（直线在 $y$ 轴上的落点）。二次函数 $f(x)=ax^2+bx+c$ 画成抛物线，$a>0$ 开口向上、$a<0$ 开口向下，顶点在 $x=-\\frac{b}{2a}$ 处。',
              },
            ],
            keyFormulas: [
              { latex: 'f(x)=mx+b', meaning: '一次函数，$m$ 斜率 $b$ 截距', display: 'block' },
              { latex: 'x_{\\text{顶点}}=-\\frac{b}{2a}', meaning: '二次函数顶点横坐标', display: 'block' },
            ],
            figure: {
              kind: 'function',
              initialFn: 'x^2-2*x-3',
              caption: '观察二次函数 $y=x^2-2x-3$ 的抛物线。用顶点公式算顶点横坐标 $x=1$，在图上验证。',
            },
            examplesBasic: [
              {
                title: '求抛物线顶点',
                level: 'basic',
                asking: '求 $f(x)=x^2-2x-3$ 的顶点坐标。',
                given: ['$a=1,\\ b=-2,\\ c=-3$'],
                method: ['顶点横坐标公式'],
                steps: [
                  { action: '求顶点横坐标', latex: '$x=-\\frac{b}{2a}=-\\frac{-2}{2\\cdot1}=1$', why: '代入顶点公式。' },
                  { action: '求顶点纵坐标', latex: '$f(1)=1^2-2\\cdot1-3=-4$', why: '把 $x=1$ 代回函数。' },
                ],
                result: '顶点为 $(1,-4)$。',
                check: '图像最低点在 $(1,-4)$ 附近，符合 $a>0$ 开口向上 ✓。',
              },
            ],
            summary: [
              { text: '一次函数是直线（斜率 $m$），二次函数是抛物线（顶点 $x=-\\frac{b}{2a}$）。这两类的斜率/顶点概念，正是导数要推广的对象。' },
            ],
          },
        },
        {
          id: 'p1c5t2',
          title: '反函数',
          objective: '理解反函数「把输入输出互换」的含义，会求简单反函数',
          minutes: 15,
          blocks: {
            background: [
              {
                text: '如果函数 f 是「把摄氏度转成华氏度」，反函数就是「把华氏度转回摄氏度」。它把输入和输出的角色对调。',
              },
            ],
            plain: [
              {
                text: '求反函数分三步：① 把 $y=f(x)$ 里的 $x$ 和 $y$ 互换位置；② 解出新的 $y$；③ 写成 $y=f^{-1}(x)$。图像上，反函数是原函数关于直线 $y=x$ 的镜像。注意 $f^{-1}$ 是反函数记号，不是 $\\frac{1}{f}$！',
              },
            ],
            definition: [
              {
                text: '若 $f$ 是一一对应的函数，则它的反函数 $f^{-1}$ 满足：$f^{-1}(f(x))=x$ 且 $f(f^{-1}(y))=y$。即先做 $f$ 再做 $f^{-1}$，回到原点。',
              },
            ],
            examplesBasic: [
              {
                title: '求反函数',
                level: 'basic',
                asking: '求 $f(x)=2x+3$ 的反函数。',
                given: ['$y=2x+3$'],
                method: ['互换 $x,y$ 后解出 $y$'],
                steps: [
                  { action: '写成 $y=\\cdots$', latex: '$y=2x+3$', why: '从原函数出发。' },
                  { action: '互换 $x$ 与 $y$', latex: '$x=2y+3$', why: '反函数交换输入输出。' },
                  { action: '解出 $y$', latex: '$x-3=2y\\Rightarrow y=\\frac{x-3}{2}$', why: '移项、系数化 1。' },
                ],
                result: '$f^{-1}(x)=\\dfrac{x-3}{2}$。',
                check: '$f(1)=5$，$f^{-1}(5)=\\frac{5-3}{2}=1$ ✓，回到原值。',
                pitfall: '$f^{-1}(x)$ 不是 $\\frac{1}{f(x)}$，上标 $-1$ 表示「反函数」不是「倒数」。',
              },
            ],
            summary: [
              { text: '反函数把输入输出对调，求法是「互换 $x,y$ 再解出 $y$」，图像关于 $y=x$ 对称。$f^{-1}$ 表示反函数，不是倒数。第 9 章的对数函数就是指数的反函数。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第六章 指数与对数 ============================ */
    {
      id: 'p1c6',
      number: 6,
      title: '指数与对数',
      intro:
        '指数描述「增长」，对数描述「增长了多少次」。它们互为反函数，是描述人口增长、复利、衰变以及机器学习中损失函数的语言。自然常数 $e$ 也在这里登场。',
      outcomes: [
        '理解指数函数与对数函数',
        '掌握对数运算法则与换底公式',
        '理解指数与对数互为反函数',
        '认识自然常数 e 与自然对数 ln',
      ],
      topics: [
        {
          id: 'p1c6t1',
          title: '指数函数',
          objective: '理解指数函数 $a^x$ 的图像与增长特性',
          minutes: 14,
          blocks: {
            background: [
              {
                text: '细胞分裂「1 变 2、2 变 4、4 变 8……」，这种「每步乘固定倍数」的增长就是指数增长。函数 $f(x)=2^x$ 描述它。',
              },
            ],
            plain: [
              {
                text: '指数函数 $f(x)=a^x$（$a>0,a\\neq1$）：输入 $x$ 是**指数**。当 $a>1$ 时函数快速递增（爆炸式增长）；当 $0<a<1$ 时递减（衰变）。它过定点 $(0,1)$，因为 $a^0=1$。',
              },
            ],
            figure: {
              kind: 'function',
              initialFn: '2^x',
              caption: '观察指数函数 $y=2^x$：注意它过 $(0,1)$，且向右急剧上升、向左无限接近 $x$ 轴（但永不等于 0）。',
            },
            examplesBasic: [
              {
                title: '指数函数取值',
                level: 'basic',
                asking: '比较 $2^3$、$2^0$、$2^{-2}$ 的大小。',
                given: ['底数 $a=2>1$'],
                method: ['指数函数递增性质'],
                steps: [
                  { action: '分别计算', latex: '$2^3=8,\\quad 2^0=1,\\quad 2^{-2}=\\frac{1}{4}$', why: '用指数法则，负指数取倒数。' },
                  { action: '比较', latex: '$8>1>\\frac{1}{4}$', why: '底数大于 1 时指数越大值越大。' },
                ],
                result: '$2^3>2^0>2^{-2}$。',
                check: '与「$2^x$ 递增」一致 ✓。',
              },
            ],
            summary: [
              { text: '指数函数 $a^x$ 描述「按比例增长/衰变」，$a>1$ 增长、$0<a<1$ 衰变，恒过点 $(0,1)$。' },
            ],
          },
        },
        {
          id: 'p1c6t2',
          title: '对数的意义与运算',
          objective: '理解对数是指数的逆运算，掌握对数运算法则',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '「2 的几次方等于 8？」答案是 3。这个「问次数」的问题就是对 logarithm（对数）要回答的。对数把「乘除」变成「加减」，是计算对数尺的原理。',
              },
            ],
            plain: [
              {
                text: '$\\log_a b=c$ 读作「以 $a$ 为底 $b$ 的对数等于 $c$」，意思是 $a^c=b$。**对数就是指数**：问的是「底数 $a$ 要自乘几次才能得到 $b$」。比如 $\\log_2 8=3$，因为 $2^3=8$。',
              },
            ],
            definition: [
              {
                title: '对数的定义',
                text: '若 $a^c=b$（$a>0,a\\neq1,b>0$），则 $c=\\log_a b$。这里 $a$ 叫底数，$b$ 叫真数（必须为正）。',
              },
            ],
            keyFormulas: [
              { latex: '\\log_a(xy)=\\log_a x+\\log_a y', meaning: '乘积的对数 = 对数之和' },
              { latex: '\\log_a\\frac{x}{y}=\\log_a x-\\log_a y', meaning: '商的对数 = 对数之差' },
              { latex: '\\log_a(x^n)=n\\log_a x', meaning: '幂的对数 = 指数乘对数' },
              { latex: '\\log_a a^x=x,\\quad a^{\\log_a x}=x', meaning: '指数与对数互为反函数' },
              { latex: '\\log_a b=\\frac{\\log_c b}{\\log_c a}', meaning: '换底公式（常用于换成 $\\ln$ 或 $\\log_{10}$）' },
            ],
            examplesBasic: [
              {
                title: '对数计算',
                level: 'basic',
                asking: '计算 $\\log_2 8$ 与 $\\log_{10}100$。',
                given: ['$\\log_2 8$', '$\\log_{10}100$'],
                method: ['转化为指数问题'],
                steps: [
                  { action: '算 $\\log_2 8$', latex: '$2^?=8\\Rightarrow2^3=8\\Rightarrow\\log_2 8=3$', why: '问 2 的几次方是 8。' },
                  { action: '算 $\\log_{10}100$', latex: '$10^?=100\\Rightarrow10^2=100\\Rightarrow\\log_{10}100=2$', why: '问 10 的几次方是 100。' },
                ],
                result: '$\\log_2 8=3$，$\\log_{10}100=2$。',
                check: '代回指数形式都成立 ✓。',
              },
            ],
            mistakes: [
              { title: '真数必须为正', text: '$\\log_a b$ 要求 $b>0$。$\\log_2(-4)$ 无意义，因为 $2$ 的任何实数次方都不会是负数。' },
            ],
            summary: [
              { text: '对数是指数的逆运算：$\\log_a b=c \\Longleftrightarrow a^c=b$。对数把乘除变加减、把幂变乘法。真数必须为正。' },
            ],
          },
        },
        {
          id: 'p1c6t3',
          title: '自然对数与自然常数 e',
          objective: '认识自然常数 e 与自然对数 ln，理解其特殊地位',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '有一个数比 π 还「神奇」，它就是 $e\\approx2.71828$。它不是圆周率那种几何常数，而是从「增长」本身长出来的常数。微积分里它无处不在。',
              },
            ],
            plain: [
              {
                text: '想象银行复利：一年存 1 元、利率 100%，如果一年结算一次得 2 元；每半年结算得 2.25 元；结算越频繁，收益越接近一个上限——这个上限就是 $e$。以 $e$ 为底的对数叫**自然对数** $\\ln x=\\log_e x$。它「自然」是因为 $\\ln x$ 的导数恰好是 $\\frac1x$，干净得不可思议。',
              },
            ],
            definition: [
              {
                title: 'e 的一种定义',
                text: '$e=\\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n$。这个极限存在，其值约为 $2.71828$，是无理数。',
              },
            ],
            keyFormulas: [
              { latex: 'e=\\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n\\approx2.71828', meaning: '自然常数 e 的极限定义', display: 'block' },
              { latex: '\\ln x=\\log_e x', meaning: '自然对数是以 e 为底的对数' },
            ],
            examplesBasic: [
              {
                title: '认识 ln',
                level: 'basic',
                asking: '计算 $\\ln e$、$\\ln 1$、$e^{\\ln 5}$。',
                given: ['$\\ln e$', '$\\ln 1$', '$e^{\\ln 5}$'],
                method: ['$\\ln$ 是以 $e$ 为底的对数'],
                steps: [
                  { action: '算 $\\ln e$', latex: '\\ln e=\\log_e e=1', why: '$e^1=e$。' },
                  { action: '算 $\\ln 1$', latex: '\\ln 1=\\log_e 1=0', why: '$e^0=1$。' },
                  { action: '算 $e^{\\ln 5}$', latex: '$e^{\\ln 5}=5$', why: '指数与对数互为反函数，互相抵消。' },
                ],
                result: '$\\ln e=1$，$\\ln 1=0$，$e^{\\ln 5}=5$。',
                check: '都符合反函数性质 ✓。',
              },
            ],
            application: [
              {
                title: '现实中的 e',
                text: '复利、人口增长、放射性衰变、火箭方程……凡是「增长率与当前量成正比」的过程，都会自然冒出 $e$。在机器学习里，常用的交叉熵损失、softmax 函数也都以 $e$ 为基础。',
              },
            ],
            ai: [
              {
                title: '为 AI 埋下伏笔',
                text: '神经网络的输出层常用 $e^x$ 构造 softmax，把任意分数变成概率；损失函数里的 $\\ln$ 衡量「预测分布与真实分布有多远」。第 6 篇学梯度下降时会反复见到它们。',
              },
            ],
            summary: [
              { text: '$e\\approx2.71828$ 是「增长」的天然常数，$\\ln x$ 是以它为底的对数。它们之所以「自然」，是因为在微积分中 $e^x$ 的导数还是 $e^x$，$\\ln x$ 的导数是 $\\frac1x$——这是下一篇之后的精彩内容。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第七章 三角函数 ============================ */
    {
      id: 'p1c7',
      number: 7,
      title: '三角函数',
      intro:
        '三角函数描述「周期与波动」——钟摆、声波、交流電、季节变化。它也是微积分里求导和积分的重要对象。我们从角度与弧度讲起，用单位圆把 sin、cos、tan 讲清楚。',
      outcomes: [
        '理解角度与弧度的换算',
        '借助单位圆理解 sin、cos、tan',
        '认识三角函数的图像与基本恒等式',
      ],
      topics: [
        {
          id: 'p1c7t1',
          title: '角度、弧度与单位圆',
          objective: '理解弧度制，能用单位圆定义正弦与余弦',
          minutes: 20,
          blocks: {
            background: [
              {
                text: '小学用「度」量角（一圈 360°），但高等数学偏爱「弧度」。为什么？因为弧度让三角函数的导数公式变得干净漂亮。',
              },
            ],
            plain: [
              {
                text: '**弧度**的定义很几何：弧长等于半径时所对的圆心角就是 1 弧度。一圈的弧长是 $2\\pi r$，所以一圈是 $2\\pi$ 弧度，即 $360^\\circ=2\\pi$，半圈 $180^\\circ=\\pi$。**单位圆**是半径为 1 的圆，圆上角度 $\\theta$ 对应点的坐标是 $(\\cos\\theta,\\sin\\theta)$——这就是正弦余弦的几何来源。',
              },
            ],
            keyFormulas: [
              { latex: '\\pi\\ \\text{弧度}=180^\\circ', meaning: '弧度与角度换算' },
              { latex: '(x,y)=(\\cos\\theta,\\sin\\theta)', meaning: '单位圆上点的坐标', note: '这是三角函数的根本定义' },
              { latex: '\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}', meaning: '正切 = 正弦除以余弦' },
            ],
            figure: {
              kind: 'function',
              initialFn: 'sin(x)',
              caption: '观察 $y=\\sin x$ 的波形。横轴用弧度（标出 $\\pi$、$2\\pi$），注意周期为 $2\\pi$、振幅为 1。',
            },
            examplesBasic: [
              {
                title: '角度换弧度',
                level: 'basic',
                asking: '把 $90^\\circ$ 换成弧度，并求 $\\sin 90^\\circ$。',
                given: ['$90^\\circ$'],
                method: ['$180^\\circ=\\pi$ 换算', '单位圆定义'],
                steps: [
                  { action: '换算成弧度', latex: '$90^\\circ=\\frac{90}{180}\\pi=\\frac{\\pi}{2}$', why: '用 $180^\\circ=\\pi$ 作比例。' },
                  { action: '查单位圆', latex: '$\\sin\\frac{\\pi}{2}=1$', why: '单位圆上 $\\frac{\\pi}{2}$ 对应点 $(0,1)$，纵坐标是 1。' },
                ],
                result: '$90^\\circ=\\frac{\\pi}{2}$，$\\sin 90^\\circ=1$。',
                check: '正弦值在 $[-1,1]$ 内 ✓。',
              },
            ],
            examplesAdvanced: [
              {
                title: '单位圆求三角函数值',
                level: 'advanced',
                asking: '求 $\\cos\\frac{\\pi}{3}$ 与 $\\tan\\frac{\\pi}{4}$。',
                given: ['$\\frac{\\pi}{3}=60^\\circ$', '$\\frac{\\pi}{4}=45^\\circ$'],
                method: ['特殊角的单位圆坐标', '$\\tan=\\frac{\\sin}{\\cos}$'],
                steps: [
                  { action: '求 $\\cos\\frac{\\pi}{3}$', latex: '$\\frac{\\pi}{3}$ 对应点 $\\left(\\frac12,\\frac{\\sqrt3}{2}\\right)$，故 $\\cos\\frac{\\pi}{3}=\\frac12$', why: '余弦是单位圆上点的横坐标。' },
                  { action: '求 $\\tan\\frac{\\pi}{4}$', latex: '$\\sin\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}=\\frac{\\sqrt2}{2}$', why: '45° 点横纵坐标相等。' },
                  { action: '算正切', latex: '$\\tan\\frac{\\pi}{4}=\\frac{\\sqrt2/2}{\\sqrt2/2}=1$', why: '正切等于正弦除以余弦。' },
                ],
                result: '$\\cos\\frac{\\pi}{3}=\\dfrac12$，$\\tan\\frac{\\pi}{4}=1$。',
                check: '这些都是常用特殊角，值得记住。',
              },
            ],
            mistakes: [
              { title: '角度模式', text: '微积分中三角函数一律用**弧度**。用计算器求导相关计算时，角度模式要设为弧度（RAD），否则答案会差一个 $\\frac{\\pi}{180}$ 的因子。' },
            ],
            summary: [
              { text: '弧度让三角函数「自然」：$180^\\circ=\\pi$，单位圆上点是 $(\\cos\\theta,\\sin\\theta)$，$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$。微积分中一律用弧度。' },
            ],
          },
        },
        {
          id: 'p1c7t2',
          title: '三角恒等式',
          objective: '掌握 fundamental 恒等式与和角公式',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '三角恒等式是三角函数的「变形规则」。在积分技巧里，它们能把难算的式子变成好算的——所以现在先认识它们。',
              },
            ],
            plain: [
              {
                text: '最根本的是勾股恒等式 $\\sin^2\\theta+\\cos^2\\theta=1$，它就是单位圆上 $x^2+y^2=1$ 的三角版本（因为 $x=\\cos\\theta,y=\\sin\\theta$）。其余恒等式大多由它和和角公式推出。',
              },
            ],
            keyFormulas: [
              { latex: '\\sin^2\\theta+\\cos^2\\theta=1', meaning: '勾股恒等式（最重要）', display: 'block' },
              { latex: '1+\\tan^2\\theta=\\sec^2\\theta', meaning: '由勾股恒等式两边除以 $\\cos^2$ 得到' },
              { latex: '\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B', meaning: '正弦和角公式', display: 'block' },
              { latex: '\\cos(A+B)=\\cos A\\cos B-\\sin A\\sin B', meaning: '余弦和角公式', display: 'block' },
            ],
            derivation: {
              intro: '看 $\\sin^2\\theta+\\cos^2\\theta=1$ 从哪来：',
              steps: [
                { action: '单位圆方程', latex: '$x^2+y^2=1$', why: '半径为 1、圆心在原点的圆。' },
                { action: '代入三角定义', latex: '$x=\\cos\\theta,\\ y=\\sin\\theta$', why: '单位圆上点的坐标定义。' },
                { action: '得到恒等式', latex: '$\\cos^2\\theta+\\sin^2\\theta=1$', why: '直接代入圆方程。' },
              ],
            },
            examplesBasic: [
              {
                title: '用恒等式求值',
                level: 'basic',
                asking: '已知 $\\sin\\theta=\\frac{3}{5}$ 且 $\\theta$ 在第一象限，求 $\\cos\\theta$。',
                given: ['$\\sin\\theta=\\frac{3}{5}$', '$\\theta$ 在第一象限（余弦为正）'],
                method: ['勾股恒等式'],
                steps: [
                  { action: '代入恒等式', latex: '$\\left(\\frac35\\right)^2+\\cos^2\\theta=1$', why: '$\\sin^2+\\cos^2=1$。' },
                  { action: '解出 $\\cos^2$', latex: '$\\cos^2\\theta=1-\\frac{9}{25}=\\frac{16}{25}$', why: '移项计算。' },
                  { action: '开方定符号', latex: '$\\cos\\theta=\\frac45$', why: '第一象限余弦为正，取正根。' },
                ],
                result: '$\\cos\\theta=\\dfrac45$。',
                check: '$\\left(\\frac35\\right)^2+\\left(\\frac45\\right)^2=\\frac{9+16}{25}=1$ ✓。',
              },
            ],
            summary: [
              { text: '三角恒等式由单位圆和勾股定理生长出来，核心是 $\\sin^2+\\cos^2=1$。它们在后面积分技巧（三角换元）中是关键工具。' },
            ],
          },
        },
      ],
    },

    /* ============================ 第八章 微积分预备知识 ============================ */
    {
      id: 'p1c8',
      number: 8,
      title: '微积分预备知识',
      intro:
        '第一篇的收官，也是通向微积分的桥。我们把「变化」这件事讲透：平均变化率、斜率、切线，以及「无限接近」的朴素思想。学完这章，你就站在微积分的门口了。',
      outcomes: [
        '理解平均变化率就是割线斜率',
        '直观理解切线与瞬时变化率',
        '初步建立「无限接近」的极限思想',
      ],
      topics: [
        {
          id: 'p1c8t1',
          title: '变化、平均变化率与斜率',
          objective: '理解平均变化率并会计算',
          minutes: 18,
          blocks: {
            background: [
              {
                text: '开车 2 小时走了 120 公里，平均速度 60 km/h。这个「总变化 ÷ 总时间」就是平均变化率。微积分关心的正是各种「变化率」。',
              },
            ],
            plain: [
              {
                text: '函数 $f$ 在区间 $[x_1,x_2]$ 上的**平均变化率**是 $\\dfrac{f(x_2)-f(x_1)}{x_2-x_1}$——它正是连接两点 $(x_1,f(x_1))$、$(x_2,f(x_2))$ 的**割线斜率**。斜率衡量「有多陡」：正的往上走，负的往下走。',
              },
            ],
            definition: [
              {
                title: '平均变化率',
                text: '$$\\[\\text{平均变化率}\\]=\\frac{\\Delta y}{\\Delta x}=\\frac{f(x_2)-f(x_1)}{x_2-x_1}$$',
              },
            ],
            keyFormulas: [
              { latex: '\\frac{\\Delta y}{\\Delta x}=\\frac{f(x_2)-f(x_1)}{x_2-x_1}', meaning: '平均变化率 = 割线斜率', display: 'block' },
            ],
            figure: {
              kind: 'derivative',
              initialFn: 'x^2',
              caption: '拖动曲线上的点，观察切线斜率如何随位置变化。这正是下一篇「导数」要精确描述的东西。',
            },
            examplesBasic: [
              {
                title: '求平均变化率',
                level: 'basic',
                asking: '求 $f(x)=x^2$ 在 $[1,3]$ 上的平均变化率。',
                given: ['$f(x)=x^2$', '区间 $[1,3]$'],
                method: ['平均变化率公式'],
                steps: [
                  { action: '算端点函数值', latex: '$f(1)=1,\\quad f(3)=9$', why: '先求两点的 $y$ 值。' },
                  { action: '代入公式', latex: '$\\frac{f(3)-f(1)}{3-1}=\\frac{9-1}{2}=4$', why: '函数值之差除以自变量之差。' },
                ],
                result: '平均变化率为 $4$。',
                check: '割线从 $(1,1)$ 到 $(3,9)$，斜率 $\\frac{8}{2}=4$ ✓。',
              },
            ],
            summary: [
              { text: '平均变化率 $\\frac{\\Delta y}{\\Delta x}$ 就是割线斜率。它描述「一段区间上平均有多快」，但想知道「某一瞬间的速度」，需要让它无限逼近——这就是极限与导数。' },
            ],
          },
        },
        {
          id: 'p1c8t2',
          title: '无限接近：极限的朴素思想',
          objective: '建立「让间隔趋近于 0」的直观极限概念',
          minutes: 16,
          blocks: {
            background: [
              {
                text: '想知道车在「刚好第 2 秒」的瞬时速度，没法用 0 秒的间隔（会变成 0/0）。办法是：先看 2 到 2.1 秒的平均速度，再看 2 到 2.01 秒、2 到 2.001 秒……间隔越小，结果越接近某个固定的数。这个「趋近」就是极限。',
              },
            ],
            plain: [
              {
                text: '想象你走向一堵墙：第一步走一半距离，第二步走剩下的一半的一半……永远走不到墙，但**可以无限接近**。极限就是说：虽然我们永远不让间隔 $\\Delta x$ 真的等于 0（否则除以 0 无意义），但让它越来越接近 0 时，变化率会 stabil 稳定到某个值。这个值就是瞬时变化率（导数）。',
              },
            ],
            definition: [
              {
                text: '朴素地说，$\\lim_{x\\to a}f(x)=L$ 表示：当 $x$ 无限接近 $a$（但不等于 $a$）时，$f(x)$ 无限接近 $L$。第 3 篇会给出严格的 $\\varepsilon$-$\\delta$ 定义。',
              },
            ],
            figure: {
              kind: 'limit',
              initialFn: 'sin(x)/x',
              params: { target: 0 },
              caption: '拖动自变量趋近 0，观察 $\\frac{\\sin x}{x}$ 的值如何趋近 1——尽管在 $x=0$ 处它没有定义。这正是极限的精髓。',
            },
            examplesBasic: [
              {
                title: '数值观察极限',
                level: 'basic',
                asking: '观察 $f(x)=\\frac{x^2-1}{x-1}$ 当 $x$ 趋近 1 时的值。',
                given: ['$f(x)=\\frac{x^2-1}{x-1}$，$x\\neq1$'],
                method: ['先化简，再代入'],
                steps: [
                  { action: '因式分解', latex: '$\\frac{x^2-1}{x-1}=\\frac{(x-1)(x+1)}{x-1}=x+1\\quad(x\\neq1)$', why: '$x^2-1$ 是平方差，可约去 $(x-1)$。' },
                  { action: '观察趋近', latex: '$x\\to1$ 时 $x+1\\to2$', why: '约分后函数在 $x=1$ 附近就是 $x+1$。' },
                ],
                result: '$\\lim_{x\\to1}f(x)=2$，尽管 $f(1)$ 本身无定义（$\\frac00$）。',
                check: '代 $x=0.999$：$x+1=1.999$，接近 2 ✓。',
              },
            ],
            ai: [
              {
                title: '为什么 AI 需要极限',
                text: '训练神经网络时的「梯度」本质上是导数，而导数是极限。理解「无限接近」，就理解了机器如何「朝着让损失更小的方向微调参数」——第 6 篇会把它讲透。',
              },
            ],
            summary: [
              { text: '极限的思想是「无限接近但不等于」。它让我们绕过 $\\frac00$，定义出瞬时变化率（导数）。第 3 篇会给出严格定义与计算技巧，第二篇先帮你建立直觉。' },
            ],
          },
        },
      ],
    },
  ],
};
