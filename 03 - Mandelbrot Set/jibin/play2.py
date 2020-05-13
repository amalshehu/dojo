import pygame
from mandelbrot_2 import find_mandel, find_mandel2

width = 800
height = 800

clock = pygame.time.Clock()

def display_mandel_plane(plane):
    surf = pygame.surfarray.make_surface(plane)
    return surf

active = True
import time
start = time.process_time()
plane = find_mandel2(4 / 800)
print(time.process_time() - start)

start = time.process_time()
plane = find_mandel(4 / 800)
print(time.process_time() - start)

mandel_plane = display_mandel_plane(plane)

pygame.init()
display = pygame.display.set_mode((width, height))

while active:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            active = False

            
    mouse_pos = pygame.mouse.get_pos()
    display.blit(mandel_plane, (0, 0))
    pygame.display.update()


pygame.quit()