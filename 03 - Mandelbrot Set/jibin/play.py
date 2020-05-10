import pygame
import numpy as np
from mandelbrot import Mandelbrot

size = (400, 400)

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

    display.blit(mandel_plane, (0, 0))
    pygame.display.update()


pygame.quit()
