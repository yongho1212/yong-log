---
title: JS 드래그 앤 드롭(Drag and Drop) 구현하기
date: "2024-04-20T22:12:03.284Z"
description: "지난 프로젝트에서 사용했던 자바스크립트로 드래그 앤 드롭 기능을 직접 구현해볼 예정이다."
---

지난 프로젝트에서 pdf viewer 내부에서 마우스 휠로 scale을 조절하고 drag and drop으로 문서를 탐색하는 기능을 구현했다.
이번 포스트를 통해 JS로 드래그 앤 드롭을 구현하고 bound 기능까지 구현해볼 예정이다.

![Map](./map.gif)
<br/>
> 약간 이런느낌..?
<br/>

먼저 일반적인 Drag부터 구현해보자.

<iframe 
    height="400" style="width: 100%;" scrolling="no" title="Untitled" 
    src="https://codepen.io/yongho1212/embed/gOyBjzW?default-tab=html%2Cresult" 
    frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"
    >
    See the Pen 
    <a href="https://codepen.io/yongho1212/pen/gOyBjzW">
        Untitled
    </a> 
    by yongho1212 (<a href="https://codepen.io/yongho1212">@yongho1212</a>)
    on <a href="https://codepen.io">CodePen</a>.
</iframe>

> 0.5x 로 봐주시면 됩니다!

```js
let startX, startY;
let initialX, initialY; 
```
먼저 마우스 이동거리 계산을 위한 변수와 드래그 하고자 하는 요소 (이하 draggable)의 위치를 저장하기 위한 변수를 생성
<br/>
```js
draggable.addEventListener('mousedown', function(e) {
    startX = e.clientX;
    startY = e.clientY;
    initialX = draggable.offsetLeft; // 요소의 현재 left 값을 저장
    initialY = draggable.offsetTop;  // 요소의 현재 top 값을 저장
    isDragging = true;
    draggable.style.cursor = 'grabbing';
});
```
이후 draggable 요소에 mousedown에 대한 eventListener를 추가해준다. <br/>
`e.clientX`, `e.clientY`로 startX,Y값을 저장 <br/>
요소의 현재 위치를 `initialX` `initialX`에 저장한다. <br/>

> 이 코드에서는 draggable의 부모가 body이기때문에 offsetLeft, Top을 사용했다.
> 상황에 따라 다르게 사용해야한다!
<br/>

```js
document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const moveX = e.clientX - startX + initialX;
        const moveY = e.clientY - startY + initialY;

        draggable.style.left = `${moveX}px`;
        draggable.style.top = `${moveY}px`;
    }
});
```





| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

[View raw (TEST.md)](https://raw.github.com/adamschwartz/github-markdown-kitchen-sink/master/README.md)

This is a paragraph.

    This is a paragraph.

# Header 1

## Header 2

    Header 1
    ========

    Header 2
    --------

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

    # Header 1 #
    ## Header 2 ##
    ### Header 3 ###
    #### Header 4 ####
    ##### Header 5 #####
    ###### Header 6 ######

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> ## This is a header.
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();

    > ## This is a header.
    > 1. This is the first list item.
    > 2. This is the second list item.
    >
    > Here's some example code:
    >
    >     Markdown.generate();

- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue

```markdown
- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue
```

- `code goes` here in this line
- **bold** goes here

```markdown
- `code goes` here in this line
- **bold** goes here
```

1. Buy flour and salt
1. Mix together with water
1. Bake

```markdown
1. Buy flour and salt
1. Mix together with water
1. Bake
```

1. `code goes` here in this line
1. **bold** goes here

```markdown
1. `code goes` here in this line
1. **bold** goes here
```

Paragraph:

    Code

<!-- -->

    Paragraph:

        Code

---

---

---

---

---

    * * *

    ***

    *****

    - - -

    ---------------------------------------

This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example][id] reference-style link.

[id]: http://example.com "Optional Title"

    This is [an example](http://example.com "Example") link.

    [This link](http://example.com) has no title attr.

    This is [an example] [id] reference-style link.

    [id]: http://example.com "Optional Title"

_single asterisks_

_single underscores_

**double asterisks**

**double underscores**

    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__

This paragraph has some `code` in it.

    This paragraph has some `code` in it.

![Alt Text](https://via.placeholder.com/200x50 "Image Title")

    ![Alt Text](https://via.placeholder.com/200x50 "Image Title")
