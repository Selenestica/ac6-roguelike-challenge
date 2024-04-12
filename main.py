import random as r

def main(stage = 1):
  val = r.randint(0, 100)
  if val <= 35:
    tier = "d"
  elif val <= 65 and val > 35:
    tier = "c"
  elif val <= 85 and val > 65:
    tier = "b"
  elif val <= 95 and val > 85:
    tier = "a"
  elif val <= 100 and val > 95:
    tier = "s"
  
