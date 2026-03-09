import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {
  routers = signal<
    { path: string; label: string; activeClass: string }[]
  >([
    {
      path: '/gender/men',
      label: 'hombres',
      activeClass:
        'text-primary font-semibold underline underline-offset-4 decoration-2 scale-110',
    },
    {
      path: '/gender/women',
      label: 'mujeres',
      activeClass:
        'text-secondary font-semibold underline underline-offset-4 decoration-2 scale-110',
    },
    {
      path: '/gender/kids',
      label: 'niños',
      activeClass:
        'text-accent font-semibold underline underline-offset-4 decoration-2 scale-110',
    },
  ]);
}
