---
layout: page
title: Welcome to AI Origo
permalink: /
---

<div class="intro">
  <p>Our goal is to <strong>explore the Future of Work</strong> through collaborative Artificial Intelligence simulations, to <strong>democratize access to digital skills training</strong> and to <strong>solve complex problems using agentic AI</strong>, including the automation of scientific research processes, legacy systems migrations and consolidation of data silos and interfaces.<br><br>We offer <strong>AI strategy consultation and implementation services</strong> to our clients. We've worked with individuals and startups to banks, AAA game studios, and international research institutes. <a href="{{ '/contact' | relative_url }}">Let's talk!</a></p>
</div>

## Latest News

<div class="news-grid">
  {% assign sorted_news = site.news | sort: 'date' | reverse %}
  {% for article in sorted_news limit:6 %}
    <div class="news-item">
      <h3><a href="{{ article.url | relative_url }}">{{ article.title }}</a></h3>
      <div class="news-meta">{{ article.date | date: "%B %-d, %Y" }}</div>
      <p class="news-lead">{{ article.lead }}</p>
      <a href="{{ article.url | relative_url }}" class="read-more">Read more</a>
    </div>
  {% endfor %}
</div>

## Our Leadership

<div class="leadership-grid">
  <div class="leadership-item">
    <h3>Ferenc Hődör <a href="https://linkedin.com/in/ferenc-hodor/"><img src="{{ '/assets/images/in.png' | relative_url }}" alt="Ferenc Hődör @ LinkedIn"></a></h3>
    <p>CEO, Operations</p>
    <p>Leading our operational excellence with decades of experience in software development studios, focusing on AI and XR research in global collaboration.</p>
  </div>

  <div class="leadership-item">
    <h3>Ferenc Gundel <a href="https://linkedin.com/in/ferenc-gundel-128a6a102/"><img src="{{ '/assets/images/in.png' | relative_url }}" alt="Ferenc Gundel @ LinkedIn"></a></h3>
    <p>CEO, Business Development</p>
    <p>Driving business strategy with extensive experience in IT and Finance, specializing in large-scale project execution and strategic planning.</p>
  </div>

  <div class="leadership-item">
    <h3>Konrad Kiss <a href="https://linkedin.com/in/konradkiss/"><img src="{{ '/assets/images/in.png' | relative_url }}" alt="Konrad Kiss @ LinkedIn"></a></h3>
    <p>Director of AI</p>
    <p>AI strategist and digital generalist with global entrepreneurial experience, pioneering AI integration since 1999.</p>
  </div>
</div>
