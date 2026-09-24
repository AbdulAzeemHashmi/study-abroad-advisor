<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&pause=1000&color=8E44AD&center=true&vCenter=true&width=800&lines=AI+Video+Trailer+Pipeline;AI+Powered+Video+Analysis+Pipeline;YOLO11+plus+BLIP+plus+PyTorch+plus+Librosa;From+Raw+Footage+to+a+Scored+Trailer" alt="Typing SVG" />

![GitHub last commit](https://img.shields.io/github/last-commit/AbdulAzeemHashmi/ai-video-trailer-pipeline?color=8E44AD&style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/AbdulAzeemHashmi/ai-video-trailer-pipeline?color=yellow&style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/AbdulAzeemHashmi/ai-video-trailer-pipeline?color=orange&style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-Deep%20Learning-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)

</div>

# AI Video Trailer Pipeline

Welcome to the **AI Video Trailer Pipeline** repository. This project was originally built for an Artificial Intelligence Open Ended Lab.

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/213910845-af37a709-8995-40d6-be59-724526e3c3d7.gif" width="450">
</div>

Everything lives inside a single notebook, `AI_OEL.ipynb`. It loads one raw input video, runs it through YOLO11 person detection, scores every two second segment with a small Logistic Regression model, keeps the five strongest segments, applies a stylized visual theme, writes BLIP generated captions over the clips, and exports four finished videos plus one evaluation chart.

---

## What This Pipeline Actually Does

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="400">
</div>

The notebook loads a single video called `original.mp4`, resizes it to a width of 640 pixels, and pushes it through six connected tasks, producing four output videos and one evaluation chart. Every output video is written at 24 fps using the libx264 codec with aac audio.

```
original.mp4 (resized to width 640)
     │
     ▼
YOLO11 Person Detection (yolo11n.pt)
     │
     ├──▶ Task 1: ROI blur and bounding box video
     │
     ▼
Feature Extraction (visual std, object count, mean MFCC audio score)
     │
     ▼
Logistic Regression Impact Scoring Model (L2 penalty, weighted score 0.3 / 0.5 / 0.2)
     │
     ▼
Top 5 Segment Selection (2 second segments, ranked by score)
     │
     ├──▶ Task 3: Raw top clips trailer
     │
     ▼
Creepy Visual Theme (30 percent brightness, glowing red eyes, desaturation)
     │
     ├──▶ Task 4: Stylized visuals only trailer
     │
     ▼
BLIP Captioning plus Keyword Injection
     │
     ├──▶ Task 5: Final trailer with captions
     │
     ▼
Task 6: Scene Impact Score Timeline graph
```

---

## Repository Structure

This matches the actual files in the repository.

```
ai-video-trailer-pipeline/
├── AI_OEL.ipynb                # The full pipeline, one notebook, one code cell
├── Task1_ROI_Processing.mp4    # Output of Task 1
├── Task3_Raw_Selection.mp4     # Output of Task 3
├── Task4_Creepy_Visuals.mp4    # Output of Task 4
├── Task5_Final_Trailer.mp4     # Output of Task 5
├── Task6_Evaluation_Graph.png  # Output of Task 6
└── README.md                   # This file
```

There is no separate output file for Task 2. That task trains the scoring model in memory and feeds its results straight into Task 3.

---

## Repository Contents

| File | Description |
|---|---|
| `AI_OEL.ipynb` | The full pipeline: model loading, all six tasks, and final export |
| `Task1_ROI_Processing.mp4` | Every frame with a detected person blurred inside a green bounding box |
| `Task3_Raw_Selection.mp4` | The five highest scoring raw segments, joined together with no styling |
| `Task4_Creepy_Visuals.mp4` | The same top segments with darkened bodies, glowing red eyes, and desaturation applied |
| `Task5_Final_Trailer.mp4` | The finished trailer with BLIP generated, keyword modified captions overlaid |
| `Task6_Evaluation_Graph.png` | Line chart of the impact score for every segment against the median high impact threshold |

---

## Tech Stack and Models Used

<p>
<img src="https://img.shields.io/badge/YOLO11-Ultralytics-00FFFF?style=flat-square">
<img src="https://img.shields.io/badge/BLIP-Image%20Captioning-FF69B4?style=flat-square">
<img src="https://img.shields.io/badge/MoviePy-Video%20Editing-1E90FF?style=flat-square">
<img src="https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=flat-square&logo=opencv&logoColor=white">
<img src="https://img.shields.io/badge/PyTorch-Deep%20Learning-EE4C2C?style=flat-square&logo=pytorch&logoColor=white">
<img src="https://img.shields.io/badge/Scikit--Learn-Logistic%20Regression-F7931E?style=flat-square&logo=scikitlearn&logoColor=white">
<img src="https://img.shields.io/badge/Librosa-Audio%20Features-8A2BE2?style=flat-square">
<img src="https://img.shields.io/badge/Matplotlib-Visualization-11557C?style=flat-square">
</p>

* **YOLO11 nano, Ultralytics (`yolo11n.pt`):** Detects people in each frame in real time and supplies the object count feature used for scoring
* **BLIP base, `Salesforce/blip-image-captioning-base`:** Generates a natural language caption for the first frame of every selected clip
* **MoviePy and OpenCV:** Handle resizing, frame level image transforms, sub clipping, and final video export
* **Librosa:** Extracts MFCC audio features from each segment so sound intensity feeds into the impact score
* **Scikit Learn:** A Logistic Regression classifier with L2 regularization (`penalty='l2', C=1.0`) learns which segments count as high impact
* **PyTorch:** The deep learning backend powering YOLO11 and BLIP. The notebook checks `torch.cuda.is_available()` and runs on GPU automatically when one is present, otherwise it falls back to CPU
* **Matplotlib:** Plots the final Scene Impact Score Timeline

---

## Lab Tasks Overview

<details>
<summary><b>Task 1, ROI Processing, click to expand</b></summary>
<br>
For every frame, YOLO11 locates each person (class 0 in the YOLO output), converts that region of interest to grayscale, applies a 25 by 25 Gaussian blur, then draws a green bounding box around it. The result is exported as an independent video showing the raw detection and processing step in action.
</details>

<details>
<summary><b>Task 2, Feature Extraction and Model Training, click to expand</b></summary>
<br>
The video is split into two second segments. For each segment, three features are computed: visual intensity from the pixel standard deviation of the first frame, object count from YOLO11 on that same frame, and an audio score from the mean MFCC of the segment's audio track. These three features are combined into a raw score using the weights 0.3, 0.5, and 0.2. Segments scoring above the median become one class, and everything else becomes the other class. A Logistic Regression model with L2 regularization is then trained on these features and labels.
</details>

<details>
<summary><b>Task 3, Raw Segment Selection, click to expand</b></summary>
<br>
The trained model's raw scores are used to rank all segments. The top five highest scoring segments (or fewer, if the video is too short) are selected, restored to their original chronological order, and joined into an unedited trailer, so the selection logic can be checked before any stylization is added.
</details>

<details>
<summary><b>Task 4, Creepy Theme Visuals, click to expand</b></summary>
<br>
Each of the top segments is reprocessed frame by frame. Pixels inside every detected person's bounding box are multiplied by 0.3, which darkens them to thirty percent of their original brightness. Two small red circles are drawn near eye level to simulate glowing eyes. Finally, the whole frame is blended with a grayscale copy of itself, sixty percent color and forty percent gray, for a muted, desaturated look.
</details>

<details>
<summary><b>Task 5, Caption Generation and Final Trailer, click to expand</b></summary>
<br>
BLIP generates a natural language caption from the first frame of each stylized clip. A few common words are then swapped for more atmospheric alternatives, for example "man" becomes "The entity", "walking" becomes "stalks", and "hallway" becomes "the darkness". The result is capitalized and given a trailing ellipsis. The caption is overlaid as red text at the bottom of each clip using MoviePy's `TextClip`, which needs ImageMagick installed. If ImageMagick is missing, the notebook skips the text overlay for that segment instead of failing, and the clip is still included without a caption.
</details>

<details>
<summary><b>Task 6, Scene Impact Score Evaluation, click to expand</b></summary>
<br>
The raw impact score for every segment is plotted as a timeline, with a dashed horizontal line marking the median high impact threshold. This graph, saved as <code>Task6_Evaluation_Graph.png</code>, gives a clear visual summary of how the model ranked the video over time.
</details>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="120">
</div>

---

## How to Run

**Step 1, clone this repository**

```bash
git clone https://github.com/AbdulAzeemHashmi/ai-video-trailer-pipeline.git
cd ai-video-trailer-pipeline
```

**Step 2, install dependencies**

```bash
pip install ultralytics torch torchvision moviepy opencv-python matplotlib transformers scikit-learn librosa
```

MoviePy's text overlay in Task 5 also needs ImageMagick installed on your system. If it is missing, the pipeline still runs, it just skips the caption text for each segment.

**Step 3, add your input video**

Place a video file named `original.mp4` in the same folder as the notebook. This is the raw footage the entire pipeline runs on.

**Step 4, open the notebook**

```bash
jupyter notebook AI_OEL.ipynb
```

**Step 5, run all cells in sequence**

On first run, the notebook downloads the `yolo11n.pt` weights and the `Salesforce/blip-image-captioning-base` weights automatically. It then prints its progress through all six tasks and writes the four output videos and the evaluation graph in order.

---

## Output Summary

Once the notebook finishes, you should see the following new files in your folder, matching the files already tracked in this repository.

- `Task1_ROI_Processing.mp4`
- `Task3_Raw_Selection.mp4`
- `Task4_Creepy_Visuals.mp4`
- `Task5_Final_Trailer.mp4`
- `Task6_Evaluation_Graph.png`

---

<div align="center">

## Author

**Abdul Azeem Hashmi** ([@AbdulAzeemHashmi](https://github.com/AbdulAzeemHashmi/))

<img src="https://img.shields.io/badge/Course-Artificial%20Intelligence-8E44AD?style=for-the-badge">

<br><br>

<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100">

If you found this project helpful, consider giving it a star.

</div>