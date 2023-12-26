/** @format */

import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { MdHelpOutline } from 'react-icons/md';
import useApi from '../../hooks/useApi';

const HomeActivityPerformance = ({ overviewSelect }) => {
  const [activityPerformanceData, setActivityPerformanceData] = useState([]);

  const formData = new FormData();
  formData.append('user_id', localStorage.getItem('id'));
  formData.append('user_token', localStorage.getItem('token'));
  formData.append('type', overviewSelect);

  const fetchData = async () => {
    try {
      const response = await useApi('get-dashboard-performances', formData);
      setActivityPerformanceData(response?.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [overviewSelect]);

  const EstEarningData = [
    { label: '28 Sept', y: 0 },
    { label: '29 Sept', y: 0 },
    { label: '30 Sept', y: 10 },
    { label: '1 Oct', y: 0 },
    { label: '2 Oct', y: 0 },
    { label: '3 Oct', y: 0 },
    { label: '4 Oct', y: 0 },
  ];
  const RequestsData = [
    { label: '28 Sept', y: 0 },
    { label: '29 Sept', y: 1 },
    { label: '30 Sept', y: 0 },
    { label: '1 Oct', y: 2 },
    { label: '2 Oct', y: 0 },
    { label: '3 Oct', y: 5 },
    { label: '4 Oct', y: 0 },
  ];
  const ImpressionData = [
    { label: '28 Sept', y: 0 },
    { label: '29 Sept', y: 0 },
    { label: '30 Sept', y: 0 },
    { label: '1 Oct', y: 0 },
    { label: '2 Oct', y: 0 },
    { label: '3 Oct', y: 0 },
    { label: '4 Oct', y: 0 },
  ];
  // order-3
  return (
    <div className='box-row box2  data-loading'>
      <div className='sm-title'>Ads activity performance</div>
      {activityPerformanceData.length === 0 ? (
        <div className='shimmer-spinner performance-spinner'>
          <Spinner animation='border' variant='secondary' />
        </div>
      ) : (
        <div className='card-content pdglr16'>
          <div className='box2'>
            <div className='scorecard-name'>
              Est. earnings
              <div className='tooltip-row'>
                <MdHelpOutline className='help_icon' />
                <div className='tooltip-box'>
                  <div className='content-container'>
                    <h4>Estimated earnings</h4>
                    <p>
                      Your earnings accrued so far. This amount is an estimate
                      that is subject to change when your earnings are verified
                      for accuracy at the end of every month.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='scorecard'>
              <div className='text-box'>
                <div
                  className='label-value'
                  dangerouslySetInnerHTML={{
                    __html:
                      activityPerformanceData?.dashboard_performance_est_earnings,
                  }}
                />
              </div>
              <div className='line-chart'>
                <div className='line-chart-box'>
                  {/* <CanvasChartItem chartData={EstEarningData} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className='box2'>
            <div className='scorecard-name'>
              Requests
              <div className='tooltip-row'>
                <MdHelpOutline className='help_icon' />
                <div className='tooltip-box left-tool'>
                  <div className='content-container'>
                    <h4>Requests</h4>
                    <p>
                      The total number of ad requests received from your apps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='scorecard'>
              <div className='text-box'>
                <div
                  className='label-value'
                  dangerouslySetInnerHTML={{
                    __html:
                      activityPerformanceData?.dashboard_performance_requests,
                  }}
                />
              </div>
              <div className='line-chart'>
                <div className='line-chart-box'>
                  {/* <CanvasChartItem chartData={RequestsData} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className='box2'>
            <div className='scorecard-name'>
              Impr.
              <div className='tooltip-row'>
                <MdHelpOutline className='help_icon' />
                <div className='tooltip-box'>
                  <div className='content-container'>
                    <h4>Impressions</h4>
                    <p>
                      The total number of ads shown to users across all of your
                      ad units and apps through waterfall and bidding mediation.
                      Includes a period-over-period comparison.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='scorecard'>
              <div className='text-box'>
                <div
                  className='label-value'
                  dangerouslySetInnerHTML={{
                    __html: activityPerformanceData?.dashboard_performance_impr,
                  }}
                />
              </div>
              <div className='line-chart'>
                <div className='line-chart-box'>
                  {/* <CanvasChartItem chartData={ImpressionData} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className='box2'>
            <div className='scorecard-name'>
              Match rate
              <div className='tooltip-row'>
                <MdHelpOutline className='help_icon' />
                <div className='tooltip-box left-tool'>
                  <div className='content-container'>
                    <h4>Match rate (%)</h4>
                    <p>
                      The percentage of ad requests that received a response
                      from an ad source.
                    </p>
                    <p>
                      Match rate is&nbsp;calculated by dividing matched requests
                      by requests:
                    </p>
                    <p>
                      <em>(Matched requests / Requests) * 100%</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='scorecard'>
              <div className='text-box'>
                <div
                  className='label-value'
                  dangerouslySetInnerHTML={{
                    __html:
                      activityPerformanceData?.dashboard_performance_match_rate,
                  }}
                />
              </div>
              <div className='line-chart'>
                <div className='line-chart-box'>
                  {/* <CanvasChartItem chartData={ImpressionData} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className='box2'>
            <div className='scorecard-name'>
              eCPM
              <div className='tooltip-row'>
                <MdHelpOutline className='help_icon' />
                <div className='tooltip-box'>
                  <div className='content-container'>
                    <h4>eCPM</h4>
                    <p>Effective cost per thousand impressions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='scorecard'>
              <div className='text-box'>
                <div
                  className='label-value'
                  dangerouslySetInnerHTML={{
                    __html: activityPerformanceData?.dashboard_performance_ecpm,
                  }}
                />
              </div>
              <div className='line-chart'>
                <div className='line-chart-box'>
                  {/* <CanvasChartItem chartData={RequestsData} /> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className='box2'>
            <div className='scorecard-name'>
              CTR
              <div className='tooltip-row'>
                <MdHelpOutline className='help_icon' />
                <div className='tooltip-box'>
                  <div className='content-container'>
                    <h4>CTR</h4>
                    <p>Effective cost per thousand impressions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='scorecard'>
              <div className='text-box'>
                <div
                  className='label-value'
                  dangerouslySetInnerHTML={{
                    __html: activityPerformanceData?.dashboard_performance_ecpm,
                  }}
                />
              </div>
              <div className='line-chart'>
                <div className='line-chart-box'>
                  <CanvasChartItem chartData={EstEarningData} />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default HomeActivityPerformance;
