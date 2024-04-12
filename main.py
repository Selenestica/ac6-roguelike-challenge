import random as r

def stage_min_max(stage):
  if stage == "1":
    return [35, 65, 85, 95, 100]
  elif stage == "2":
    return [15, 50, 85, 95, 100]
  elif stage == "3":
    return [5, 30, 70, 90, 100]
  elif stage == "4":
    return [5, 25, 55, 85, 100]
  elif stage == "5":
    return [5, 15, 45, 75, 100]
  
  
def main(stage = "1"):
  min_maxs = stage_min_max(stage)
  val = r.randint(0, 100)
  if val <= min_maxs[0]:
    tier = "d"
  elif val <= min_maxs[1] and val > min_maxs[0]:
    tier = "c"
  elif val <= min_maxs[2] and val > min_maxs[1]:
    tier = "b"
  elif val <= min_maxs[3] and val > min_maxs[2]:
    tier = "a"
  elif val <= min_maxs[4] and val > min_maxs[3]:
    tier = "s"
  print(tier)
  
main()

