import pygame
import numpy as np
from mandelbrot import Mandelbrot

size = (800, 800)

mandelbrot = Mandelbrot(complex(-2, -2), complex(2, 2))
mandelbrot.set_resolution(size)
plane = mandelbrot.find_mandel()
plane = np.array(plane, dtype='int')
plane = np.reshape(plane, size)

def display_mandel_plane(plane):
    surf = pygame.surfarray.make_surface(plane.astype(int))
    return surf


pygame.init()
active = True
display = pygame.display.set_mode(size)
mandel_plane = display_mandel_plane(plane)
while active:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            active = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            window_low = (mouse_pos[0] - (size[0] // 4), mouse_pos[1] - (size[1] // 4))
            window_high = (mouse_pos[0] + (size[0] // 4), mouse_pos[1] + (size[1] // 4))

            mandelbrot.map_plane(size, window_low, window_high)
            plane = mandelbrot.find_mandel()
            plane = np.array(plane, dtype='int')
            plane = np.reshape(plane, size)
            mandel_plane = display_mandel_plane(plane)

    mouse_pos = pygame.mouse.get_pos()
    display.blit(mandel_plane, (0, 0))
    pygame.display.update()


pygame.quit()
