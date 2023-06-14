
The project is a customizable component that allows users to manage and create custom topics within a React application. It provides an intuitive user interface for viewing, adding, and deleting topics, along with their associated keywords.

Features:
1. Category Filtering: Users can filter topics based on different categories such as "All," "Custom," "ICP," "Mission," and "Product."
2. Custom Topic Creation: Users can create custom topics by providing a topic name and a list of keywords, separated by commas.
3. Keyword Highlighting: Keywords associated with each topic are displayed with different background colors, making them visually distinct.
4. Topic Deletion: Users can delete custom topics from the list, specifically when the selected category is "Custom."
5. Topic Editing: Users can write content for each topic using an external editor component.
6. Responsive Design: The component is designed to be responsive, adapting to different screen sizes.
7. Toggleable Navigation: The navigation menu can be toggled open or closed to maximize the display area for topics.

Features of the editor:

1. Dynamic Content: The code retrieves specific content for the editor based on the topic parameter passed through React Router. It fetches the corresponding data from the data array, which contains information about different topics, tones, and descriptions.

2. Tone Selection: The editor includes a dropdown menu that allows the user to select a tone. The available tones are populated dynamically from the data array.

3. Content Generation: When a tone is selected, the user can click the "Generate" button to populate the editor's content area with a randomly selected description from the data corresponding to the selected tone.

4. Abbreviation Expansion: The editor includes a functionality to automatically expand abbreviations while typing. When a space is entered after an abbreviation, the code checks if it exists in the abbreviationDictionary object and replaces it with its expanded form. For example, typing "AI" would automatically expand it to "Artificial Intelligence".

5. Undo Functionality: The editor supports the undo functionality for the content. By pressing Ctrl + Z, the user can undo the last word entered in the content area.

6. Image Upload: The code allows the user to upload an image by clicking the "Add Image" button. The selected image is displayed in the editor, and the user can edit its width and height using input fields.

7. Image Editing: The code provides options to edit the width and height of the selected image. Changes to these dimensions are immediately reflected in the displayed image.

8. Image Removal: The user can remove the selected image by clicking the "Remove Image" button.

9. Keyboard Navigation: The code includes keyboard navigation features. When the user presses the right arrow key after typing an abbreviation, the code automatically expands the abbreviation to its expanded form and moves the cursor to the end of the expanded word.

10. Close Button: The editor includes a "Close" button that triggers the onClose function when clicked.

These features collectively allow the user to select a tone, generate content, edit the content, upload and edit images, and navigate through the editor using both keyboard and mouse interactions.


Usage
To integrate the React Custom Topic Manager component into your React project, follow these steps:



Import the necessary files:

import React, { useState, useRef, useCallback } from 'react';
import { datas } from './datas';
import Editor from './Editor';
import './Custom.css';

Customize the component by modifying the provided keywordColors object to define different background colors for specific keywords:

const keywordColors = {
  seo: '#f25565',
  sales: '#e7f56c',
  strategy: '#62f255',
  'own a business': '#e7f56c',
  'website design': '#f25565',
  marketing: '#62f255',
};

<Custom keywordColors={keywordColors} />


