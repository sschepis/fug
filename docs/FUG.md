# Fug Markup Language

#Sample Fug Markup Language

header(margin-left=10px)[
    logo(width=40px,length=40px,margin=10px)[
        image(src=http://foo.bar/img.png),
    ],
],
navbar(display=flex,flex-direction=column)[
    row[
        column(width=50%)[
            link(text='Home',href='http://foo.bar/home'),
        ],
        column(width=50%)[
            link(text='About',href='http://foo.bar/about'),
        ],
    ],
    row[
        column(width=50%)[
            link(text='Contact',href='http://foo.bar/contact'),
        ],
        column(width=50%)[
            link(text='Blog',href='http://foo.bar/blog'),
        ],
    ],
],
feature(display=flex,flex-direction=column)[
    row[
        column(width=50%)[
            image(src=http://foo.bar/img.png),
        ],
        column(width=50%)[
            title(text='Feature Title'),
            description()[`Feature Description`],
        ],
    ],
],
three-column (display=flex,flex-direction=column)[
    row[
        column(width=33%)[
            image(src=http://foo.bar/img.png),
            title(text='Column Title'),
            description(text='Column Description'),
        ],
        column(width=33%)[
            image(src=http://foo.bar/img.png),
            title(text='Column Title'),
            description()[`Column Description`],
        ],
        column(width=33%)[
            image(src=http://foo.bar/img.png),
            title(text='Column Title'),
            description(text='Column Description'),
        ],
    ],
],
about-team (display=flex,flex-direction=column)[
    row[
        column(width=50%)[
            image(src=http://foo.bar/img.png),
        ],
        column(width=50%)[
            title(text='About Team Title'),
            description(text='About Team Description'),
        ],
    ],
],
contact-us (display=flex,flex-direction=column)[
    row[
        column(width=50%)[
            title(text='Contact Us Title'),
            description(text='Contact Us Description'),
        ],
        column(width=50%)[
            textbox(id=name,placeholder='Name'),
            textbox(id=email,placeholder='Email'),
            textbox(id=subject,placeholder='Subject'),
            textbox(id=message,placeholder='Message'),
            button(text='Submit',event=submitContact),
        ],
    ],
],
footer (display=flex,flex-direction=column)[
    row[
        column(width=50%)[
            title(text='Footer Title'),
            description(text='Footer Description'),
        ],
        column(width=50%)[
            link(text='Home',href='http://foo.bar/home'),
            link(text='About',href='http://foo.bar/about'),
            link(text='Contact',href='http://foo.bar/contact'),
            link(text='Blog',href='http://foo.bar/blog'),
        ],
    ],
],

every element has a name. a set of attributes, a set of children, and inner text.
    The attributes are key-value pairs.
        The attribute value can be a string or a list of strings.
    The children are a list of elements.
    The inner text is a string.

# Grammar

## Elements

Elements are the building blocks of the Fug Markup Language. An element has a name, a set of attributes, a set of children, and inner text.

The attributes are key-value pairs. The attribute value can be a string or a list of strings.

The children are a list of elements.

The inner text is a string. Text is represented using backticks. he text can be multi-line.

String values are quotable using single-quotes, double-quotes or backticks. The backticks are used to represent a multi-line description.

# Regex

The following regex can be used to parse the Fug Markup Language. This regex can handle any element name, not just just the sample elements used above. The regex can also handle any attribute name, not just the sample attributes used above. The regeex is also capable of handling elements without attributes, elements without children, or both.

Parsing the elements is done in two steps. The first step is to parse the elements and their attributes. The second step is to parse the children and inner text.

## Step 1: Parse the elements

Fug elements are comma-separated. To parse the elements we therefore need to split the elements on the comma, but we must exclude commas that are inside of the elements. This is done by using a regex that matches the comma, but only if it is not inside of a pair of square brackets.

The regex is:

    (?<!\[),(?!\])