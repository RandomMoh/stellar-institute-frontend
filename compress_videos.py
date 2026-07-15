import os
import subprocess

videos_dir = "public/assets/videos"

for filename in os.listdir(videos_dir):
    if filename.endswith(".mp4") and not filename.startswith("compressed_"):
        input_path = os.path.join(videos_dir, filename)
        output_path = os.path.join(videos_dir, f"compressed_{filename}")
        
        # Check if we already compressed it
        if os.path.exists(output_path):
            continue

        print(f"Compressing {filename}...")
        
        # ffmpeg command to scale down to 720p (if larger) and compress heavily
        cmd = [
            "ffmpeg",
            "-y",
            "-i", input_path,
            "-vf", "scale='min(1280,iw)':-2",
            "-vcodec", "libx264",
            "-crf", "28",
            "-preset", "faster",
            "-acodec", "aac",
            "-b:a", "128k",
            output_path
        ]
        
        result = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        if result.returncode == 0:
            print(f"Successfully compressed {filename}. Replacing original...")
            os.remove(input_path)
            os.rename(output_path, input_path)
        else:
            print(f"Failed to compress {filename}.")

print("All compression finished!")
