/** @format */
export const SERVER_BASE_URL = 'https://jksolads.com/new/api/';
export const SITE_NAME = 'Jksol';

// Cron Form Data
export const commonOptions = [
  { value: '--', label: '-- Common Settings --' },
  { value: '* * * * *', label: 'Once Per Minute(* * * * *)' },
  { value: '*/5 * * * *', label: 'Once Per Five Minutes (*/5 * * * *)' },
  { value: '0,30 * * * *', label: 'Twice Per Hour (0,30 * * * *)' },
  { value: '0 * * * *', label: 'Once Per Hour (0 * * * *)' },
  { value: '0 0,12 * * *', label: 'Twice Per Day (0 0,12 * * *)' },
  { value: '0 0 * * *', label: 'Once Per Day (0 0 * * *)' },
  { value: '0 0 * * 0', label: 'Once Per Week (0 0 * * 0)' },
  {
    value: '0 0 1,15 * *',
    label: 'On the 1st and 15th of the month (0 0 1,15 * *)',
  },
  {
    value: '0 0 1 * *',
    label: 'Once Per Day (0 0 1 * *)',
  },
  {
    value: '0 0 1 1 *',
    label: 'Once Per Year (0 0 1 1 *)',
  },
];
export const minuteOptions = [
  { value: '--', label: '-- Common Settings --' },
  { value: '*', label: 'Once Per Minute(*)' },
  { value: '*/2', label: 'Once Per Two Minutes(*/2)' },
  { value: '*/5', label: 'Once Per Five Minutes(*/5)' },
  { value: '*/10', label: 'Once Per Ten Minutes(*/10)' },
  { value: '*/15', label: 'Once Per Fifteen Minutes(*/15)' },
  { value: '0,30', label: 'Once Per Thirty Minutes(0,30)' },
  { value: '--', label: '-- Minutes --' },
  { value: '0', label: ':00 (At the beginning of the hour.) (0)' },
  { value: '1', label: ':01 (1)' },
  { value: '2', label: ':02 (2)' },
  { value: '3', label: ':03 (3)' },
  { value: '4', label: ':04 (4)' },
  { value: '5', label: ':05 (5)' },
  { value: '6', label: ':06 (6)' },
  { value: '7', label: ':07 (7)' },
  { value: '8', label: ':08 (8)' },
  { value: '9', label: ':09 (9)' },
  { value: '10', label: ':10 (10)' },
  { value: '11', label: ':11 (11)' },
  { value: '12', label: ':12 (12)' },
  { value: '13', label: ':13 (13)' },
  { value: '14', label: ':14 (14)' },
  { value: '15', label: ':15 (At one quarter past the hour.) (15)' },
  { value: '16', label: ':16 (16)' },
  { value: '17', label: ':17 (17)' },
  { value: '18', label: ':18 (18)' },
  { value: '19', label: ':19 (19)' },
  { value: '20', label: ':20 (20)' },
  { value: '21', label: ':21 (21)' },
  { value: '22', label: ':22 (22)' },
  { value: '23', label: ':23 (23)' },
  { value: '24', label: ':24 (24)' },
  { value: '25', label: ':25 (25)' },
  { value: '26', label: ':26 (26)' },
  { value: '27', label: ':27 (27)' },
  { value: '28', label: ':28 (28)' },
  { value: '29', label: ':29 (29)' },
  { value: '30', label: ':30 (At half past the hour.) (30)' },
  { value: '31', label: ':31 (31)' },
  { value: '32', label: ':32 (32)' },
  { value: '33', label: ':33 (33)' },
  { value: '34', label: ':34 (34)' },
  { value: '35', label: ':35 (35)' },
  { value: '36', label: ':36 (36)' },
  { value: '37', label: ':37 (37)' },
  { value: '38', label: ':38 (38)' },
  { value: '39', label: ':39 (39)' },
  { value: '40', label: ':40 (40)' },
  { value: '41', label: ':41 (41)' },
  { value: '42', label: ':42 (42)' },
  { value: '43', label: ':43 (43)' },
  { value: '44', label: ':44 (44)' },
  { value: '45', label: ':45 (At one quarter until the hour.) (45)' },
  { value: '46', label: ':46 (46)' },
  { value: '47', label: ':47 (47)' },
  { value: '48', label: ':48 (48)' },
  { value: '49', label: ':49 (49)' },
  { value: '50', label: ':50 (50)' },
  { value: '51', label: ':51 (51)' },
  { value: '52', label: ':52 (52)' },
  { value: '53', label: ':53 (53)' },
  { value: '54', label: ':54 (54)' },
  { value: '55', label: ':55 (55)' },
  { value: '56', label: ':56 (56)' },
  { value: '57', label: ':57 (57)' },
  { value: '58', label: ':58 (58)' },
  { value: '59', label: ':59 (59)' },
];
export const hourOptions = [
  { value: '--', label: '-- Common Settings --' },
  { value: '*', label: 'Every Hour (*)' },
  { value: '*/2', label: 'Every Other Hour (*/2)' },
  { value: '*/3', label: 'Every Third Hour (*/3)' },
  { value: '*/4', label: 'Every Fourth Hour (*/4)' },
  { value: '*/6', label: 'Every Sixth Hour (*/6)' },
  { value: '0,12', label: 'Every Twelve Hours (0,12)' },
  { value: '--', label: '-- Hours --' },
  { value: '0', label: '12:00 a.m. Midnight (0)' },
  { value: '1', label: '1:00 a.m. (1)' },
  { value: '2', label: '2:00 a.m. (2)' },
  { value: '3', label: '3:00 a.m. (3)' },
  { value: '4', label: '4:00 a.m. (4)' },
  { value: '5', label: '5:00 a.m. (5)' },
  { value: '6', label: '6:00 a.m. (6)' },
  { value: '7', label: '7:00 a.m. (7)' },
  { value: '8', label: '8:00 a.m. (8)' },
  { value: '9', label: '9:00 a.m. (9)' },
  { value: '10', label: '10:00 a.m. (10)' },
  { value: '11', label: '11:00 a.m. (11)' },
  { value: '12', label: '12:00 p.m. Noon (12)' },
  { value: '13', label: '1:00 p.m. (13)' },
  { value: '14', label: '2:00 p.m. (14)' },
  { value: '15', label: '3:00 p.m. (15)' },
  { value: '16', label: '4:00 p.m. (16)' },
  { value: '17', label: '5:00 p.m. (17)' },
  { value: '18', label: '6:00 p.m. (18)' },
  { value: '19', label: '7:00 p.m. (19)' },
  { value: '20', label: '8:00 p.m. (20)' },
  { value: '21', label: '9:00 p.m. (21)' },
  { value: '22', label: '10:00 p.m. (22)' },
  { value: '23', label: '11:00 p.m. (23)' },
];
export const dayOptions = [
  { value: '--', label: '-- Common Settings --' },
  { value: '*', label: 'Every Day (*)' },
  { value: '*/2', label: 'Every Other Day (*/2)' },
  { value: '1,15', label: 'On the 1st and 15th of the Month (1,15)' },
  { value: '--', label: '-- Days --' },
  { value: '1', label: '1st (1)' },
  { value: '2', label: '2nd (2)' },
  { value: '3', label: '3rd (3)' },
  { value: '4', label: '4th (4)' },
  { value: '5', label: '5th (5)' },
  { value: '6', label: '6th (6)' },
  { value: '7', label: '7th (7)' },
  { value: '8', label: '8th (8)' },
  { value: '9', label: '9th (9)' },
  { value: '10', label: '10th (10)' },
  { value: '11', label: '11th (11)' },
  { value: '12', label: '12th (12)' },
  { value: '13', label: '13th (13)' },
  { value: '14', label: '14th (14)' },
  { value: '15', label: '15th (15)' },
  { value: '16', label: '16th (16)' },
  { value: '17', label: '17th (17)' },
  { value: '18', label: '18th (18)' },
  { value: '19', label: '19th (19)' },
  { value: '20', label: '20th (20)' },
  { value: '21', label: '21st (21)' },
  { value: '22', label: '22nd (22)' },
  { value: '23', label: '23rd (23)' },
  { value: '24', label: '24th (24)' },
  { value: '25', label: '25th (25)' },
  { value: '26', label: '26th (26)' },
  { value: '27', label: '27th (27)' },
  { value: '28', label: '28th (28)' },
  { value: '29', label: '29th (29)' },
  { value: '30', label: '30th (30)' },
  { value: '31', label: '31st (31)' },
];
export const monthOptions = [
  { value: '--', label: '-- Common Settings --' },
  { value: '*', label: 'Every Month (*)' },
  { value: '*/2', label: 'Every Other Month (*/2)' },
  { value: '*/4', label: 'Every Third Month (*/4)' },
  { value: '1,7', label: 'Every Six Months (1,7)' },
  { value: '--', label: '-- Months --' },
  { value: '1', label: 'January (1)' },
  { value: '2', label: 'February (2)' },
  { value: '3', label: 'March (3)' },
  { value: '4', label: 'April (4)' },
  { value: '5', label: 'May (5)' },
  { value: '6', label: 'June (6)' },
  { value: '7', label: 'July (7)' },
  { value: '8', label: 'August (8)' },
  { value: '9', label: 'September (9)' },
  { value: '10', label: 'October (10)' },
  { value: '11', label: 'November (11)' },
  { value: '12', label: 'December (12)' },
];
export const weekOptions = [
  { value: '--', label: '-- Common Settings --' },
  { value: '*', label: 'Every Day (*)' },
  { value: '1-5', label: 'Every Weekday (1-5)' },
  { value: '0,6', label: 'Every Weekend Day (6,0)' },
  { value: '1,3,5', label: 'Every Monday, Wednesday, and Friday (1,3,5)' },
  { value: '2,4', label: 'Every Tuesday and Thursday (2,4)' },
  { value: '--', label: '-- Weekdays --' },
  { value: '0', label: 'Sunday (0)' },
  { value: '1', label: 'Monday (1)' },
  { value: '2', label: 'Tuesday (2)' },
  { value: '3', label: 'Wednesday (3)' },
  { value: '4', label: 'Thursday (4)' },
  { value: '5', label: 'Friday (5)' },
  { value: '6', label: 'Saturday (6)' },
];
export const overViewSelectOption = [
  { value: '1', label: 'Today so far' },
  { value: '2', label: 'Yesterday vs same day last week' },
  { value: '3', label: 'Last 7 days vs previous 7 days' },
  { value: '4', label: 'Last 28 days vs previous 28 days' },
];

//Jquery
import $ from 'jquery';
$(document).on('click', '.section-menu.with-submenu', function () {
  $(this).parents().toggleClass('hover-active');
});
$(document).on('click', '.popup-wrapper.apps-popup', function () {
  $(this).parents().toggleClass('hover-active');
});
if ($('.menu-popup-box').hasClass('.hover-active')) {
}
$(document).on('click', '.right-box-wrap', function () {
  $('.menu-popup-box.hover-active').removeClass('hover-active');
});

$(document).on('click', '.close-filter', function () {
  $('.checkboxes.active').removeClass('active').slideUp(0);
  $(this).parents('.checkboxes').prev('.add-filter').removeClass('active');
});
$(document).on('click', '.input-box input', function () {
  $(this).addClass('input-active');
});
$(document).on('click', 'body', function (e) {
  if (!$(e.target).is('.input-box input'))
    $('.input-active').removeClass('input-active');
});
$(document).on('ready', 'input.input', function (e) {
  if ($('input.input').val() != '') {
    $(this).removeClass('text-add');
  }
});
$(document).on('blur', 'input.input', function (e) {
  if ($(this).val() != '') {
    $(this).addClass('text-add');
    $(this).parents('.input-box').addClass('text-add-wrap');
  } else {
    $(this).removeClass('text-add');
  }
});
$(document).on('click', '.apply-btn', function () {
  $('.checkboxes.active').removeClass('active').slideUp(0);
});

$(document).on('click', '.section-menu', function () {
  if ($(window).width() < 767) {
    $('.sidebar-wrap.open-menu').removeClass('open-menu');
    $('.right-box-wrap.open-box').removeClass('open-box');
  }
});
$(document).on('click', '.more-button', function (e) {
  $(this).toggleClass('more-open');
  e.stopPropagation();
});
$(document).on('click', 'body', function () {
  $('.more-button.more-open').removeClass('more-open');
});

$(document).on('click', '.select-dropdown .arrow-btn', function () {
  $(this).parent().toggleClass('active');
});
$(document).on('hover', '.select-dropdown .arrow-btn', function () {
  $(this).prevAll().toggleClass('hover');
});

// Report Filter
$(document).ready(function () {
  $('body').on('click', '.add-filter', function () {
    $('.checkboxes.active').removeClass('active').slideUp(0);
    $(this).next('.checkboxes').slideToggle(0);
    $(this).next('.checkboxes').toggleClass('active');
    $(this).addClass('active');
  });
  $('button.apply-btn').on('click', function () {
    $('.checkboxes.active').removeClass('active').slideUp(0);
  });

  $('a.apply-btn').on('click', function () {
    $(this)
      .parents('.none-selected-text')
      .parents('.right-result-box box2')
      .prev('.left-check-box')
      .find('input[type="checkbox"]')
      .removeAttr('checked');
  });
  $('input[type="checkbox"]').on('click', function () {
    $(this).attr('checked');
  });
});

// $(document)(function () {
//   $('[data-toggle="tooltip"]').tooltip();
// });

// let tooltipRefresh = () => {
//   $("[data-bs-toggle='tooltip']").tooltip();
// };

// $(function () {
//   $('[data-bs-toggle="tooltip"]').tooltip();
// });
