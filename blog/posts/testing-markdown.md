---
title: 'Sample GFM for testing'
date: '2023-04-28'
tags: [GFM, Testing]
---

[Quickstart for writing on GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github)

## remark-gfm

### Autolink literals

www.example.com, https://example.com, and contact@example.com.

### Footnote

A note[^1]

[^1]: Big note.

### Strikethrough

~one~ or ~~two~~ tildes.

### Table

| a   | b   |   c |  d  |
| --- | :-- | --: | :-: |

### Tasklist

- [ ] to do
- [x] done

## remark-github

Some references:

- Commit: 492f92c117f52af917ffb2543f4e485179b49888
- Commit (fork): foo@492f92c117f52af917ffb2543f4e485179b49888
- Commit (repo): remarkjs/remark@e1aa9f6c02de18b9459b7d269712bcb50183ce89
- Issue or PR (`#`): #1
- Issue or PR (`GH-`): GH-1
- Issue or PR (fork): foo#1
- Issue or PR (project): remarkjs/remark#1
- Mention: @wooorm

Some links:

- Commit: <https://github.com/remarkjs/remark/commit/e1aa9f6c02de18b9459b7d269712bcb50183ce89>
- Commit comment: <https://github.com/remarkjs/remark/commit/ac63bc3abacf14cf08ca5e2d8f1f8e88a7b9015c#commitcomment-16372693>
- Issue or PR: <https://github.com/remarkjs/remark/issues/182>
- Issue or PR comment: <https://github.com/remarkjs/remark-github/issues/3#issue-151160339>
- Mention: <https://github.com/ben-eb>

## remark-raw

<details>

<summary>Tips for collapsed sections</summary>

### You can add a header

You can add text within a collapsed section.

You can add an image or a code block, too.

```ruby
   puts "Hello World"
```

</details>

## starry-night

```js
console.log('it works!');
```

## remark-math & rehype-mathjax

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

## TBD: Mermaid

Here is a simple flow chart:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
