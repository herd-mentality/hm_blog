# 🐏 Contributing to the Herd Mentality blog

Thank you for contributing to our blog! This guide will walk you through the process of adding new blog posts and author profiles.

## Table of Contents

- [Adding a New Author](#adding-a-new-author)
- [Adding a New Blog Post](#adding-a-new-blog-post)
  - [Using Custom Components](#using-custom-components)
- [File Naming Conventions](#file-naming-conventions)
- [Best Practices](#best-practices)

## Adding a New Author

If you're a new contributor, you'll need to create an author profile.

### 1. Create Your Author Profile

1. Create a new `.mdx` file in `data/authors/`
2. Name it with your **author ID** (lowercase, no spaces): `yourname.mdx`
3. This ID will be used in the `authors` field of blog posts

### 2. Add Your Author Information

Use the following YAML format:

```yaml
---
name: Your Full Name
avatar: /static/images/yourname-avatar.jpg
role: Your Role/Title
company: Your Company/Organization
email: your.email@example.com
linkedin: https://www.linkedin.com/in/yourprofile/
github: https://github.com/yourusername
personal: https://yourwebsite.com/
preferred_social: personal
---
```

**Field Descriptions:**

- **name**: Your full name as you want it displayed
- **avatar**: Path to your profile picture (see below)
- **role**: Your job title or role, no qualifiers - e.g. 'Engineer'/'Analyst'
- **company**: Herd Mentality
- **email**: Your contact email
- **linkedin** (optional): Your LinkedIn profile URL
- **github** (optional): Your GitHub profile URL
- **personal** (optional): Your personal website or blog URL
- **preferred_social**: Which social link to highlight (`personal`, `linkedin`, `github`, or `email`) in blog posts

**Example:**

```yaml
---
name: John Doe
avatar: /static/images/johndoe-avatar.jpg
role: Data Scientist
company: Tech Corp
email: john.doe@example.com
linkedin: https://www.linkedin.com/in/johndoe/
github: https://github.com/johndoe
personal: https://johndoe.com/
preferred_social: github
---
```

### 3. Add Your Profile Picture

1. Add your headshot to `public/static/images/`
2. Name it using the format: `{authorid}-avatar.{ext}`
   - For author ID `johndoe`, use `johndoe-avatar.jpg`
3. Supported formats: `.jpg`, `.jpeg`, `.png`
4. Recommended size: At least 400x400 pixels, square aspect ratio


## Adding a New Blog Post

### 1. Create Your Blog Post File

Blog posts are written in MDX format (Markdown with JSX support), but can be treated as regular Markdown for most purposes.

1. Create a new `.mdx` file in the `data/blog/` directory
2. Name your file using lowercase with hyphens (e.g., `my-post.mdx`)
3. For multi-part series or posts with many images, create a subdirectory (e.g., `my-series/part-1.mdx`)

### 2. Add the Required YAML Front Matter

Every blog post must start with a YAML header containing metadata. Here's the required format:

```yaml
---
title  : Your Post Title Here
date   : 'YYYY-MM-DD'
tags   : ['tag1', 'tag2', 'tag3']
draft  : false
summary: 'A brief summary of your post that will appear in listings'
authors: ['authorid']
---
```

> [!NOTE]
> If `date` is past the current date, your post won't show up on the site.

**Field Descriptions:**

- **title**: The full title of your blog post
- **date**: Publication date in `YYYY-MM-DD` format (enclosed in quotes)
- **tags**: Array of relevant tags (lowercase, use hyphens for multi-word tags)
- **draft**: Set to `true` to hide the post from production, `false` to publish
- **summary**: A short description (1-2 sentences) that appears in post listings
- **authors**: Array of author IDs (must match filenames in `data/authors/`)

**Example:**

```yaml
---
title  : Understanding Machine Learning Basics
date   : '2024-01-15'
tags   : ['machine-learning', 'ai', 'python', 'tutorial']
draft  : false
summary: 'A beginner-friendly introduction to core machine learning concepts and algorithms'
authors: ['johndoe', 'janedoe']
---
```

### 3. Write Your Content

After the YAML front matter, write your blog post using Markdown syntax. MDX also supports:

- React components (if needed)
- Custom components from `components/InPostComponents.tsx`
- Standard Markdown: headings, lists, code blocks, images, links, etc.

**Example Post Structure:**

```markdown
---
title  : My Amazing Post
date   : '2024-01-15'
tags   : ['example', 'tutorial']
draft  : false
summary: 'Learn how to write amazing blog posts'
authors: ['johndoe']
---

# Introduction

Your introduction here...

## Main Section

Your content here...

### Subsection

More details...

## Conclusion

Wrap up your post...
```

### 4. Using Custom Components

The blog includes custom React components that you can use to enhance your posts. These are located in `components/InPostComponents.tsx`.

#### Available Components

**1. Caption Component**

Use `<Caption>` to add styled captions below images, charts, or diagrams.

```jsx
import { Caption } from './components/InPostComponents.tsx'

![](/static/images/my-post/diagram.png)

<Caption text="Description of the image or diagram"/>
```

**Example from `abs-robust-regression.mdx`:**

```jsx
![](/static/images/abs-robust-reg/robust_regression_varying_c.gif)

<Caption text="The effects of varying the outlier threshold on robust regression fit and forecast"/>
```

**2. Highlight Component**

Use `<Highlight>` to emphasize important text inline with a gradient highlight effect.

```jsx
import { Highlight } from './components/InPostComponents.tsx'

This is regular text, but <Highlight text="this part is highlighted and stands out"/> from the rest.
```

**Example from `abs-robust-regression.mdx`:**

```jsx
However, <Highlight text="relying solely on the count of deaths officially attributed to COVID-19 may not reveal the full picture"/>. This metric may be misleading...
```

**Example from `async-plumber.mdx`:**

```jsx
However, `plumber` suffers from a limitation of R. <Highlight text="R is single-threaded, so a request to an API endpoint will block the main process from handling any further requests until the current one is done"/>.
```

#### How to Import Components

At the top of your `.mdx` file (right after the YAML front matter), import the components you need:

```jsx
---
title  : My Post
date   : '2024-01-15'
tags   : ['example']
draft  : false
summary: 'Example post'
authors: ['johndoe']
---

import { Caption, Highlight } from './components/InPostComponents.tsx'

# Your Content Starts Here
```

> [!TIP]
> You can import just the components you need: `import { Caption } from './components/InPostComponents.tsx'` or import both at once as shown above.

> [!NOTE]
> The import path is relative: `./components/` works because the blog posts are in `data/blog/` and the components are in the root `components/` directory.

### 5. Add Images and Screenshots

1. Create a folder in `public/static/images/` that matches your blog post filename
   - For `my-awesome-post.mdx`, create `public/static/images/my-awesome-post/`
   - For `my-series/part-1.mdx`, create `public/static/images/my-series/`

2. Add all your images to this folder

3. Reference images in your post using:
   ```markdown
   ![Alt text](/static/images/my-awesome-post/screenshot.png)
   ```

**Image Best Practices:**

- Use descriptive filenames (e.g., `architecture-diagram.png` instead of `image1.png`)
- Optimize images for web (compress large files)
- Supported formats: `.png`, `.jpg`, `.jpeg`, `.gif`
- Always include alt text for accessibility

## File Naming Conventions

### Blog Posts

- Use lowercase letters
- Separate words with hyphens
- Be descriptive but concise
- Examples:
  - ✅ `machine-learning-basics.mdx`
  - ✅ `aws-lambda-tutorial.mdx`
  - ✅ `data-wrangling-tips.mdx`
  - ❌ `ML_basics.mdx`
  - ❌ `post1.mdx`
  - ❌ `My Post.mdx`

### Author IDs

- Use lowercase letters
- No spaces or special characters
- Typically firstname + lastname
- Examples:
  - ✅ `johndoe.mdx`
  - ✅ `janedoe.mdx`
  - ❌ `john-doe.mdx`
  - ❌ `John_Doe.mdx`

### Image Folders

- Match the blog post filename (without `.mdx`)
- Examples:
  - `machine-learning-basics.mdx` → `public/static/images/machine-learning-basics/`
  - `tutorials/python-intro.mdx` → `public/static/images/tutorials/`

## Best Practices

### Writing Style

- Write clear, concise content
- Use headings to structure your post
- Include code examples when relevant
- Add a table of contents for longer posts
- Proofread before submitting

### Code Blocks

Use fenced code blocks with language specification:

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

### Tags

- Use existing tags when possible (check `data/tag-data.json`)
- Keep tags relevant and specific
- Use lowercase with hyphens for multi-word tags
- Typical categories: language (`python`, `javascript`), technology (`aws`, `docker`), topic (`machine-learning`, `web-dev`)

### Drafts

- Set `draft: true` while working on your post
- This keeps it hidden from the live site
- Change to `draft: false` when ready to publish

### Multi-Author Posts

For posts with multiple authors:

```yaml
authors: ['author1', 'author2', 'author3']
```

All author IDs must have corresponding files in `data/authors/`.

## Questions?

If you have any questions or run into issues, please reach out to the blog maintainers or open an issue in the repository.

Happy blogging! 🎉

